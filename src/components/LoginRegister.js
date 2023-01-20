import * as React from 'react'
import { Navigate } from 'react-router-dom'
import { LOADING, SIGN_IN, SIGN_UP, SUCCESS } from '../commons/constants'
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
  LockOutlinedIcon,
  Paper,
  TextField,
  Typography,
  LoadingScreen,
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
const ButtonCustom = ({ children, onClick, type = 'button' }) => (
  <Button
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
  const { preValidate, error, data, status } = useAuth()
  const [imageRandom] = React.useState(getRandomNumber())

  const handleSignUp = () => {
    setCreate(false)
  }
  const handleSignIn = () => {
    setCreate(true)
  }

  if (data !== null && status === SUCCESS) {
    return <Navigate to="/profile" />
  }

  const label = create ? 'Se connecter' : 'Créer un compte'
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
                preValidate={preValidate}
                create={create}
                status={status}
              />
              {error ? (
                <Alert severity="error">Erreur: {error.message}</Alert>
              ) : null}
            </DialogContent>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                {create ? (
                  <Button onClick={handleSignUp}>Créer un compte</Button>
                ) : (
                  <Button onClick={handleSignIn}>Se connecter</Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
const FormLogin = ({ preValidate, create, status }) => {
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
      ? preValidate(email, password, SIGN_IN)
      : preValidate(email, password, SIGN_UP)
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {status === LOADING ? <LoadingScreen /> : null}
      <TextFieldCustom
        label="adresse email"
        name="email"
        complete="email"
        focus={true}
        onChange={handleChangeEmail}
      />
      <TextFieldCustom
        label="mot de passe"
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
      <ButtonCustom type="submit">
        {create ? 'Connexion' : 'Créer'}
      </ButtonCustom>
    </Box>
  )
}
export { LoginRegister }
