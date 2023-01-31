import { Paper, useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { getUrl } from '../../utils/helper'
import { Card, CardMedia, Container, Typography } from './index'

const CardImage = ({ data, type, route, dimension = {} }) => {
  const theme = useTheme()
  const title = data.title.romaji ?? data.title.english

  return (
    <Card
      sx={{
        position: 'relative',
        ':hover': {
          opacity: '0.4',
        },
        maxWidth: dimension?.maxwidth,
      }}
      elevation={24}
    >
      <Link
        to={getUrl(type, route, [data.id])}
        style={{
          textDecoration: 'none',
          cursor: 'pointer',
          textAlign: 'center',
          color: theme.palette.text.primary,
        }}
      >
        <CardMedia
          component="img"
          image={data.coverImage.large}
          alt={title}
          height={dimension?.height}
          width={dimension?.width}
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
      </Link>
    </Card>
  )
}

const getTroncateTitle = (title) => {
  if (title.length > 40) {
    return title.substring(0, 40).concat('...')
  }
  return title
}

export { CardImage }
