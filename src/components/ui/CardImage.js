import { useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { getUrl } from '../../utils/helper'
import { Box, Card, CardMedia, Container, Paper, Typography } from './index'

const CardImage = ({ data, type, route }) => {
  const theme = useTheme()
  const [hover, setHover] = React.useState(false)
  const title = data.title.romaji ?? data.title.english

  const handleHoverIn = () => {
    setHover(true)
  }
  const handleHoverOut = () => {
    setHover(false)
  }

  return (
    <Card
      onMouseLeave={handleHoverOut}
      onMouseOver={handleHoverIn}
      sx={{ position: 'relative' }}
    >
      <Box
        to={getUrl(type, route, [data.id])}
        sx={{
          cursor: 'pointer',
          textAlign: 'center',
        }}
        color={theme.palette.text.primary}
      >
        <CardMedia
          component="img"
          image={data.coverImage.large}
          alt={title}
          height={280}
        />
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            my: 1,
          }}
        >
          <Typography component="p" sx={{ mt: 'auto' }}>
            {getTroncateTitle(title)}
          </Typography>
        </Container>
        {hover ? <OverlayCard type={type} data={data} route={route} /> : null}
      </Box>
    </Card>
  )
}

const OverlayCard = ({ type, data, route }) => {
  return (
    <Link to={getUrl(type, route, [data?.id])}>
      <Paper
        component="div"
        sx={{
          position: 'absolute',
          opacity: '0.4',
          width: '100%',
          height: '100%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '1',
        }}
      />
    </Link>
  )
}

const getTroncateTitle = (title) => {
  if (title.length > 40) {
    return title.substring(0, 40).concat('...')
  }
  return title
}

export { CardImage }
