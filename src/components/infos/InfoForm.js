import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { Box, Button, Rating, TextField, Typography } from '../ui'
import StarIcon from '@mui/icons-material/Star'

import { updateComment } from '../../database/user'

import Modale from './../Modal'

import { labels } from './scoreLabels'

function InfoForm({ info }) {
  const { data: authUser } = useAuth()
  let { type } = useParams()

  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const [comment, setComment] = useState(false)
  const changeComment = setComment

  // React Hook Form
  const { register, handleSubmit } = useForm()

  const [commentTitle, setCommentTitle] = useState('')
  const [commentValue, setCommentValue] = useState('')

  const onSubmit = (data) => {
    if (authUser === null) {
      handleOpenModal()
    } else {
      changeComment(!comment)
      updateComment(type, info, data, authUser)
    }
  }

  useEffect(() => {
    if (commentTitle !== '' || commentValue !== '') {
      if (authUser === null) {
        handleOpenModal()
      }
    }
  }, [authUser, commentTitle, commentValue])

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        mb: '25px',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography component="h3" variant="h4">
        Leave a review
      </Typography>

      <FormRating />

      <TextField
        id="outlined-basic"
        label="Title"
        variant="filled"
        size="small"
        required
        type="string"
        name="title"
        {...register('title')}
        value={commentTitle}
        onChange={(e) => setCommentTitle(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="Write your review here..."
        variant="filled"
        multiline
        required
        name="comment"
        {...register('comment')}
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
      />

      <Button
        variant="contained"
        style={{ margin: '0 auto' }}
        type="submit"
        value="Submit"
        color={comment ? 'secondary' : 'success'}
      >
        {comment ? 'Sent!' : 'Submit'}
      </Button>

      {open && (
        <Modale
          open={open}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </Box>
  )
}

function FormRating() {
  const [value, setValue] = useState(null)
  const [hover, setHover] = useState(-1)

  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  return (
    <Box>
      <Rating
        name={'Review rating'}
        defaultValue={null}
        value={value}
        precision={0.5}
        readOnly={false}
        onChange={(e, newValue) => {
          setValue(newValue)
        }}
        onChangeActive={(e, newHover) => {
          setHover(newHover)
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Typography>{labels[hover !== -1 ? hover : value]}</Typography>

      {open && (
        <Modale
          open={open}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </Box>
  )
}

export default InfoForm
