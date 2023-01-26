import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { Box, Button, Rating, TextField } from '../ui'
import Modale from './../Modal'
import { updateRating } from '../../database/user'
import Input from '@mui/material/Input'
import OutlinedInput from '@mui/material/OutlinedInput'

function InfoForm({ info }) {
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const { data: authUser } = useAuth()
  let { type } = useParams()

  const { register, handleSubmit } = useForm()
  // const onSubmit = (data) => console.log(data) // {titleR: 'test', commentR: 'Je teste le formulaire'}

  const onSubmit = (data) => {
    if (authUser === null) {
      handleOpenModal()
    } else {
      console.log(data) // {titleR: 'test', commentR: 'Je teste le formulaire'}
      // updateRating(type, info, authUser)
    }
  }

  return (
    <>
      <p>Leave a comment (Please note that you must be logged in)</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="filled"
          size="small"
          required
          type="string"
          name="title"
          placeholder="title"
          {...register('titleR')}
        />
        <TextField
          id="outlined-basic"
          label="Your comment"
          variant="filled"
          multiline
          required
          name="comment"
          placeholder="comment"
          {...register('commentR')}
        />
        <Button
          variant="contained"
          style={{ margin: '0 auto' }}
          type="submit"
          value="Submit"
        >
          Submit
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
