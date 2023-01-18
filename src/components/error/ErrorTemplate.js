import { Link, redirect } from 'react-router-dom'
import { Button, Container, Typography, Box } from '../ui'
import { getImageName } from '../../utils/helper'
import '../../styles/image.css'

const getProps = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}

const ErrorTemplate = ({ error = null, reset = () => {}, image = null }) => {
  const handleClick = () => {
    redirect('/')
    reset()
  }

  return (
    <Container sx={{ ...getProps }}>
      <Box>
        <img src={image} alt={getImageName(image)} className="error" />
      </Box>
      <Typography variant="h4">Oh, êtes vous perdu?</Typography>
      {error ? (
        <>
          <Typography variant="body1">{`Erreur : ${error}`}</Typography>
          <Button onClick={handleClick}>Revenez en sécurité</Button>
        </>
      ) : (
        <>
          <Link to="/">
            <Button color="primary">Revenez en sécurité</Button>
          </Link>
        </>
      )}
    </Container>
  )
}

export { ErrorTemplate }
