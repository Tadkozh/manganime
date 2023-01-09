import { Box, Button, TextField } from '@mui/material'

const LoginRegister = () => {
  const handleSubmit = () => {
    console.log('connecter')
  }

  return (
    <Box onSubmit={handleSubmit}>
      <TextField name="email" label="email" type="email" id="email" required />
      <TextField name="password" label="password" type="password" id="password" required />
      <Button type="submit">Se connecter</Button>
    </Box>
  )
}

export { LoginRegister }
