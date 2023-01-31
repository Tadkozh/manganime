import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { Button, Paper, TextField, Typography } from '../ui'

import { updateComment } from '../../database/user'

import { PersonalRating } from './RatingInfos'

import Modale from './../Modal'

function InfoForm({ info }) {
  const { data: authUser } = useAuth()

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
      updateComment(info, data, authUser)
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
    <Paper
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        p: '10px',
        m: '10px auto',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography component="h3" variant="h4">
        Leave a review
      </Typography>

      <PersonalRating />

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
    </Paper>
  )
}

export default InfoForm
