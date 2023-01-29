import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { updateBio } from '../../database/user'
import '../../styles/text.css'
import { Box, Button, Container, TextareaAutosize } from '../ui'

const ProfileBioForm = ({ closeBio, user }) => {
  const [bio, setBio] = React.useState('')
  const { execute } = useAuth()

  const handleSaveBio = () => {
    execute(updateBio(bio, user))
    closeBio(true)
  }

  const handleChangeBio = (e) => {
    setBio(e.target.value)
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
          <Button onClick={handleSaveBio} variant="contained">
            Save Bio
          </Button>
        </Container>
      </>
    </Box>
  )
  // }
}

export { ProfileBioForm }
