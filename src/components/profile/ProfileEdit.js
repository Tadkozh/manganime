import { Alert, Box, Button, TextField } from '@mui/material'
import React from 'react'
import { SIGN_UPDATE } from '../../commons/constants'
import { useAuth } from '../../context/AuthContext'

const ProfileEdit = ({ user }) => {
  const [email, setEmail] = React.useState(user.email)
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState(user.name)
  const { preValidate, error, status } = useAuth()

  const handdleSubmit = (event) => {
    event.preventDefault()
    console.log('edit profile')
    preValidate(email, password, SIGN_UPDATE, true)
  }

  const handleChangeUserName = (e) => {
    setUsername(e.target.value)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
    console.log('email', e.target.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <Box component={'form'} onSubmit={handdleSubmit} sx={{ m: 1 }}>
      <TextField
        label={'Username'}
        name={'username'}
        autoFocus={true}
        onChange={handleChangeUserName}
        value={username}
      />
      <TextField
        label={'Email'}
        name={'email'}
        autoComplete={'email'}
        onChange={handleChangeEmail}
        value={email}
      />
      <TextField
        label={'Password'}
        name={'password'}
        autoComplete={'current-password'}
        onChange={handleChangePassword}
      />
      <Button variant="contained" type="submit">
        Save change
      </Button>
      {error ? <Alert severity="error">Erreur: {error.message}</Alert> : null}
    </Box>
  )
}

export { ProfileEdit }
