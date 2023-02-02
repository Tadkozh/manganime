import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { getUrl } from '../../utils/helper'
import { Card, CardMedia, Container, Paper, Typography } from './../ui'

const RecommendationsCard = ({ data, type, route }) => {
  const theme = useTheme()
  const title = data?.title?.romaji ?? data?.title?.english

  return (
    <Paper
      elevation={24}
      sx={{
        maxWidth: 225,
        position: 'relative',
        ':hover': {
          bgcolor: 'rgba(245, 136, 39, 0.3)',
          opacity: '0.4',
        },
      }}
    >
      <Link
        to={getUrl([type, route, data?.id])}
        style={{
          textDecoration: 'none',
          cursor: 'pointer',
          textAlign: 'center',
          color: theme.palette.text.primary,
        }}
      >
        <CardMedia
          component="img"
          image={data?.coverImage?.large}
          alt={title}
          height={335}
        />
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            my: 1,
          }}
        >
          <Typography
            component="p"
            sx={{ mt: 'auto', textTransform: 'uppercase' }}
          >
            {getTroncateTitle(title)}
          </Typography>
        </Container>
      </Link>
    </Paper>
  )
}

const getTroncateTitle = (title) => {
  if (title.length > 40) {
    return title.substring(0, 40).concat('...')
  }
  return title
}

export default RecommendationsCard
