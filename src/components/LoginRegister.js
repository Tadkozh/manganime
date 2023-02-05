import * as React from 'react'
import { Navigate } from 'react-router-dom'
import { SIGN } from '../commons/constants'
import { useAuth } from '../context/AuthContext'
import { getRandomNumber } from '../utils/helper'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  DialogContent,
  FormControlLabel,
  Grid,
  LoadingScreen,
  LockOutlinedIcon,
  Paper,
  TextField,
  Typography,
} from './ui'

const TextFieldCustom = ({
  name = '',
  label = name,
  complete = '',
  focus = false,
  onChange,
}) => (
  <TextField
    margin="normal"
    fullWidth
    name={name}
    label={label}
    type={name}
    id={name}
    autoComplete={complete}
    autoFocus={focus}
    onChange={onChange}
  />
)
const ButtonCustom = ({ children, onClick, type = 'button', aria }) => (
  <Button
    aria-label={aria}
    onClick={onClick}
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
    type={type}
  >
    {children}
  </Button>
)

const getGridProps = (number) => {
  const image = require(`../assets/images/login/login_${number}.jpg`)
  const props = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: (t) =>
      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
  return props
}
const getBoxProps = {
  my: 8,
  mx: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const LoginRegister = ({ signup = true }) => {
  const [create, setCreate] = React.useState(signup)
  const { validationSign, error, authUser: data, isLoading } = useAuth()
  const [imageRandom] = React.useState(getRandomNumber())

  const handleSignUp = () => {
    setCreate(false)
  }
  const handleSignIn = () => {
    setCreate(true)
  }

  if (data !== null && !isLoading) {
    return <Navigate to="/profile" />
  }

  const label = create ? 'Sign in' : 'Sign up'
  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{ ...getGridProps(imageRandom) }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ ...getBoxProps }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {label}
            </Typography>
            <DialogContent>
              <FormLogin
                validationSign={validationSign}
                create={create}
                isLoading={isLoading}
              />
              {error ? (
                <Alert severity="error">Error: {error.message}</Alert>
              ) : null}
            </DialogContent>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                {create ? (
                  <Button aria-label="registerAccount" onClick={handleSignUp}>
                    Register
                  </Button>
                ) : (
                  <Button aria-label="loginAccount" onClick={handleSignIn}>
                    Log in
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
export const FormLogin = ({ validationSign, create, isLoading }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  // eslint-disable-next-line no-unused-vars
  const [checked, setChecked] = React.useState(false)

  const handleChangeEmail = (e) => setEmail(e.target.value)
  const handleChangePasword = (e) => setPassword(e.target.value)
  const handleChangeChecked = (e) => setChecked(e.target.checked)

  // ajout checked à faire
  const handleSubmit = (event) => {
    event.preventDefault()
    create
      ? validationSign(email, password, SIGN.IN)
      : validationSign(email, password, SIGN.UP)
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {isLoading ? <LoadingScreen /> : null}
      <TextFieldCustom
        label="e-mail address"
        name="email"
        complete="email"
        focus={true}
        onChange={handleChangeEmail}
      />
      <TextFieldCustom
        label="password"
        name="password"
        complete="current-password"
        onChange={handleChangePasword}
      />
      <FormControlLabel
        control={
          <Checkbox
            name="remember"
            color="primary"
            onChange={handleChangeChecked}
          />
        }
        label="se souvenir de moi"
      />
      {create ? (
        <ButtonCustom aria={'loginSubmit'} type="submit">
          Login
        </ButtonCustom>
      ) : (
        <ButtonCustom aria={'registerSubmit'} type="submit">
          Register
        </ButtonCustom>
      )}
    </Box>
  )
}
export { LoginRegister }
