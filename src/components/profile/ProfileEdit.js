import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Alert, Box, Button, Grid, TextField } from '../ui'

const ProfileEdit = ({ user, closeEdit }) => {
  const [email, setEmail] = React.useState(user.email)
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState(user.name)
  const { validationProfile, error, data: currentUser } = useAuth()

  const handdleSubmit = (event) => {
    const userUpdate = {
      name: username,
      email,
      password,
    }
    event.preventDefault()
    validationProfile(userUpdate, currentUser)
    closeEdit()
  }

  const handleChangeUserName = (e) => {
    setUsername(e.target.value)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={6}>
        <Box
          component={'form'}
          onSubmit={handdleSubmit}
          sx={{
            m: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            p: '10px',
          }}
        >
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
          {error ? (
            <Alert severity="error">Erreur: {error.message}</Alert>
          ) : null}
        </Box>
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  )
}

export { ProfileEdit }
