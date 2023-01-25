import React from 'react'
import { LOADING, SUCCESS } from '../../commons/constants'
import { useAuth } from '../../context/AuthContext'
import { Alert, Box, Button, Grid, LoadingScreen, TextField } from '../ui'

const ProfileEdit = ({ user }) => {
  const [email, setEmail] = React.useState(user.email)
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState(user.name)
  const { validationProfile, error, data: currentUser, status } = useAuth()

  const handdleSubmit = (event) => {
    const userUpdate = {
      name: username,
      email,
      password,
    }
    event.preventDefault()
    validationProfile(userUpdate, currentUser)
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

  if (status === LOADING) {
    return <LoadingScreen />
  }
  if (status === SUCCESS) {
    return (
      <Grid container>
        <Grid item xs={12} md={6} lg={6}>
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
            {error ? (
              <Alert severity="error">Erreur: {error.message}</Alert>
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    )
  }
}

export { ProfileEdit }
