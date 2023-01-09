import { Typography, Container, Button } from '.'
import { useNavigate, Link } from 'react-router-dom'

const getProps = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const ErrorTemplate = ({ error = null, reset = () => {} }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
    reset()
  }

  return (
    <Container sx={{ ...getProps }}>
      <Typography variant="h4">Vous cherchez votre chemin ?</Typography>
      {error ? (
        <>
          <Typography variant="body1">{`Erreur : ${error}`}</Typography>
          <Button onClick={handleClick}>Accueil</Button>
        </>
      ) : (
        <>
          <Typography variant="body1">Erreur 404</Typography>
          <Link to="/">
            <Button>Accueil</Button>
          </Link>
        </>
      )}
    </Container>
  )
}

export { ErrorTemplate }
