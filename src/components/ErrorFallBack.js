import { Typography, Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
    resetErrorBoundary()
  }

  return (
    <Container>
      <Typography variant="h1">Vous cherchez votre chemin ?</Typography>
      <Typography variant="body1">{`Erreur : ${error}`}</Typography>
      <Button onClick={handleClick}>Accueil</Button>
    </Container>
  )
}

export { ErrorFallback }
