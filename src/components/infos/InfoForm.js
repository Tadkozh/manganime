import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { Button, TextField } from '../ui'
import Modale from './../Modal'
import { updateComment } from '../../database/user'

function InfoForm({ info }) {
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const { data: authUser } = useAuth()
  let { type } = useParams()

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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Leave a review</p>
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
          label="Your review"
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
          {comment ? 'Sent !' : 'Submit'}
        </Button>
        {open && (
          <Modale
            open={open}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        )}
      </form>
    </>
  )
}

export default InfoForm
