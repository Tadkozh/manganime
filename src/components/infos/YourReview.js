import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from '../ui'

import { DeleteForever, Edit } from '../ui'

import { useState } from 'react'
import avatarProfile from '../../assets/images/avatar_2.gif'
import { useAuth } from '../../context/AuthContext'
import { deleteComment, getTypeId, getTypeOpinion } from '../../database/user'

function YourReview({ info, setEditForm }) {
  const [deleteReviewModale, setDeleteReviewModale] = useState(false)
  const { data: user, setData: setUser } = useAuth()

  const type_opinion = getTypeOpinion(info?.type)
  const type_id = getTypeId(info?.type)

  const findReview = user[type_opinion].find(
    (data) => data[type_id] === info.id,
  )
  const yourReview = findReview?.comments[0]

  async function confirm() {
    setDeleteReviewModale(false)

    const newUser = await deleteComment(user, info, type_opinion, type_id)
    setUser(newUser)
  }

  function cancel() {
    setDeleteReviewModale(false)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
      }}
    >
      {deleteReviewModale ? (
        <Box sx={{ m: '0 auto', textAlign: 'center' }}>
          <Typography>Do you confirm the deletion of your comment?</Typography>
          <Button onClick={confirm} variant="contained" sx={{ m: 1 }}>
            YES
          </Button>
          <Button onClick={cancel} variant="outlined" sx={{ m: 1 }}>
            NO
          </Button>
        </Box>
      ) : (
        <Review
          user={user}
          yourReview={yourReview}
          editReview={setEditForm}
          deleteReview={setDeleteReviewModale}
        />
      )}
    </Box>
  )
}

function Review({ user, yourReview, editReview, deleteReview }) {
  return (
    <Card
      sx={{
        p: 1,
        width: '100%',
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={user.picture !== '' ? user.picture : avatarProfile}
            variant="circular"
            sx={{ height: '65px', width: '65px' }}
          />
        }
        title={`${user.name} | Published the
                        ${yourReview.create_at}`}
        subheader={yourReview.title}
        action={
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <EditOrDeleteBtn
              setEditForm={editReview}
              setDeleteReviewModale={deleteReview}
            />
            <Rating
              name="rating"
              value={yourReview.note}
              precision={0.5}
              readOnly
            />
          </Box>
        }
      />
      <CardContent>
        <Typography
          variant="body1"
          sx={{ p: 2, overflowX: 'hidden', width: '100%' }}
        >
          {yourReview.message}
        </Typography>
      </CardContent>
    </Card>
  )
}

function EditOrDeleteBtn({ setEditForm, setDeleteReviewModale }) {
  return (
    <Box sx={{ alignSelf: 'flex-end' }}>
      <Edit
        fontSize="medium"
        onClick={() => setEditForm(true)}
        sx={{
          ':hover': { color: 'green' },
        }}
      />
      <DeleteForever
        fontSize="medium"
        onClick={() => setDeleteReviewModale(true)}
        sx={{
          ':hover': { color: 'red' },
        }}
      />
    </Box>
  )
}

export default YourReview
