import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { updateBio } from '../../database/user'
import '../../styles/text.css'
import { Box, Button, Container, TextareaAutosize } from '../ui'

const ProfileBioForm = ({ closeBio, user }) => {
  const [bio, setBio] = React.useState('')
  const { setData } = useAuth()

  const handleSaveBio = async () => {
    const newUser = await updateBio(bio, user)
    setData(newUser)
    closeBio(true)
  }

  const handleChangeBio = (e) => {
    setBio(e.target.value)
  }
  const handleCancelBio = () => {
    closeBio(true)
  }

  return (
    <Box
      sx={{
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        m: 1,
        width: '50%',
      }}
    >
      <>
        <TextareaAutosize
          name={'bio'}
          onChange={handleChangeBio}
          minRows={4}
          placeholder={'Write you bio'}
          className="textAsMui"
        />
        <Container>
          <Button
            onClick={handleSaveBio}
            variant="contained"
            sx={{ m: 1, ml: 0 }}
          >
            Save
          </Button>
          <Button onClick={handleCancelBio} variant="outlined" sx={{ m: 1 }}>
            Cancel
          </Button>
        </Container>
      </>
    </Box>
  )
  // }
}

export { ProfileBioForm }
