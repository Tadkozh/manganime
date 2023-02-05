import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { Button, Paper, TextField, Typography } from '../ui'

import { updateComment } from '../../database/user'

import { PersonalRating } from './RatingInfos'

import Modale from './../Modal'

function InfoForm({
  info,
  editForm,
  setEditForm,
  formNoteValue,
  formTitleValue,
  formCommentValue,
}) {
  const { data: authUser, setData: setAuthUser } = useAuth()

  // React Hook Form
  const { register, handleSubmit } = useForm()

  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const [nbStar, setNbStar] = useState(editForm ? formNoteValue : null)
  const [commentTitle, setCommentTitle] = useState(
    editForm ? formTitleValue : '',
  )
  const [commentValue, setCommentValue] = useState(
    editForm ? formCommentValue : '',
  )
  const [comment, setComment] = useState(false)
  const changeComment = setComment

  const onSubmit = async (data) => {
    if (authUser === null) {
      handleOpenModal()
    } else {
      changeComment(!comment)
      const newUser = await updateComment(
        authUser,
        info,
        nbStar,
        data,
        setEditForm,
        commentTitle,
        commentValue,
      )
      setAuthUser(newUser)
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
        maxWidth: '600px',
        p: '10px',
        m: '10px auto',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography component="h3" variant="h4">
        Write a review
      </Typography>

      <PersonalRating info={info} nbStar={nbStar} setNbStar={setNbStar} />

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
        sx={{ width: 'fit-content', m: '0 auto' }}
        type="submit"
        value="Submit"
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
