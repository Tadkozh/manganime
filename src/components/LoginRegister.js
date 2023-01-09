import {
  Avatar,
  Alert,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  LockOutlinedIcon,
  Paper,
  TextField,
  Typography,
  DialogContent,
} from '.'
import * as React from 'react'

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

const getGridProps = {
  backgroundImage: 'url(https://source.unsplash.com/random)',
  backgroundRepeat: 'no-repeat',
  backgroundColor: (t) =>
    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
  backgroundSize: 'cover',
  backgroundPosition: 'center',
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
  const login = (email, password, checked) => {
    console.log('login')
  }
  const register = (email, password, checked) => {
    console.log('register')
  }
  // const { login, register, authError: error } = useAuth()

  const handleSignUp = () => {
    setCreate(false)
  }
  const handleSignIn = () => {
    setCreate(true)
  }

  const label = create ? 'Se connecter' : 'Créer un compte'
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} sx={{ ...getGridProps }} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box sx={{ ...getBoxProps }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {label}
          </Typography>
          <DialogContent>
            <FormLogin login={login} register={register} create={create} />
            {/* {error ? (
              <Alert severity="error">Erreur: {error.message}</Alert>
            ) : null} */}
          </DialogContent>

          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              {create ? (
                <Link onClick={handleSignUp}>Créer un compte</Link>
              ) : (
                <Link onClick={handleSignIn}>Se connecter</Link>
              )}
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
const FormLogin = ({ login, register, create }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [checked, setChecked] = React.useState(false)

  const handleChangeEmail = (e) => setEmail(e.target.value)
  const handleChangePasword = (e) => setPassword(e.target.value)
  const handleChangeChecked = (e) => setChecked(e.target.checked)

  const handleSubmit = (event) => {
    event.preventDefault()
    create
      ? login(email, password, checked)
      : register(email, password, checked)
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextFieldCustom
        label="adresse email"
        name="email"
        complete="email"
        focus={true}
        onChange={handleChangeEmail}
      />
      <TextFieldCustom
        name="mot de passe"
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
