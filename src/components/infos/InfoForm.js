import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { Button, TextField } from '../ui'
import Modale from './../Modal'
import { updateComment } from '../../database/user'

function InfoForm({ info }) {
  // console.log('info', info)

  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const { data: authUser } = useAuth()
  let { type } = useParams()

  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    if (authUser === null) {
      handleOpenModal()
    } else {
      // console.log(data) // {Infos récupérées par la librairie React Hook Form - title: 'test', comment: 'Je teste le formulaire'}
      updateComment(type, info, data, authUser)
    }
  }

  return (
    <>
      <p>
        Leave a comment (Before write, please note that you must be logged in)
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="outlined-basic"
          label="Title (Before write, please note that you must be logged in)"
          variant="filled"
          size="small"
          required
          type="string"
          name="title"
          {...register('title')}
        />
        <TextField
          id="outlined-basic"
          label="Your comment (Before write, please note that you must be logged in)"
          variant="filled"
          multiline
          required
          name="comment"
          {...register('comment')}
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
