import {
  Box,
  Button,
  CardMedia,
  Paper,
  Rating,
  Typography,
} from '@mui/material'

import { Edit, DeleteForever } from '../ui'

import avatarProfile from '../../assets/images/avatar_2.gif'
import { deleteComment } from '../../database/user'
import { useState } from 'react'

function YourReview({
  user,
  setUser,
  newUserComment,
  info,
  type_opinion,
  type_id,
  editForm,
  setEditForm,
}) {
  const [deleteReviewModale, setDeleteReviewModale] = useState(false)

  const findReview = newUserComment[type_opinion].find(
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
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        position: 'relative',
        width: '100%',
        p: '10px',
        m: '10px auto',
      }}
    >
      {deleteReviewModale ? (
        <Box sx={{ m: '0 auto', textAlign: 'center' }}>
          <Typography>Do you confirm the deletion of your comment?</Typography>
          <Button onClick={confirm}>YES</Button>
          <Button onClick={cancel}>NO</Button>
        </Box>
      ) : (
        <>
          <EditOrDeleteBtn
            user={user}
            info={info}
            type_opinion={type_opinion}
            type_id={type_id}
            setEditForm={setEditForm}
            setDeleteReviewModale={setDeleteReviewModale}
          />

          <Typography
            component="h3"
            variant="h5"
            sx={{
              p: '10px',
            }}
          >
            Your review:
          </Typography>
          <Box
            id="reviews"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              padding: '5px',
            }}
          >
            <Box
              sx={{
                p: '10px',
                borderRadius: '10px',
                mb: '20px',
              }}
            >
              <Box
                sx={{
                  minHeight: '75px',
                  mb: '10px',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    maxWidth: '75px',
                    minHeight: '50px',
                    maxHeight: '75px',
                    border: 'solid 1px',
                    mr: '10px',
                    float: 'left',
                  }}
                  image={user.picture !== '' ? user.picture : avatarProfile}
                  alt={`Avatar of ${user.name}`}
                />
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    {user.name} | Published the
                    {yourReview.create_at} |
                    {/* Updated the {dateUpdated.toLocaleString()} */}
                  </Typography>
                  <Typography>{yourReview.title}</Typography>
                  <Rating
                    name="rating"
                    value={yourReview.note}
                    precision={0.5}
                    readOnly
                  />
                </Box>
              </Box>

              <Typography
                sx={{
                  maxHeight: '150px',
                  overflowY: 'auto',
                  padding: '10px',
                  boxShadow: '0 0 8px -5px',
                }}
              >
                {yourReview.message}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Paper>
  )
}

function EditOrDeleteBtn({
  user,
  info,
  type_opinion,
  type_id,
  setEditForm,
  setDeleteReviewModale,
}) {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          p: '10px',
        }}
      >
        <Edit
          fontSize="large"
          onClick={() => setEditForm(true)}
          sx={{
            ':hover': { color: 'grey' },
          }}
        />
        <DeleteForever
          fontSize="large"
          onClick={() => setDeleteReviewModale(true)}
          sx={{
            ':hover': { color: 'grey' },
          }}
        />
      </Box>
    </>
  )
}

export default YourReview
