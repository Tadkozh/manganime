import { useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { getUrl } from '../../utils/helper'
import { Card, CardMedia, Typography } from './index'

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
        to={getUrl([type, route, data.id])}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          color: theme.palette.text.primary,
          textAlign: 'center',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        <CardMedia
          component="img"
          image={data.coverImage.large}
          alt={title}
          // height={dimension?.height}
          // width={dimension?.width}
          sx={{ aspectRatio: '2/3' }}
        />
        <Typography
          component="p"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            p: '10px',
          }}
        >
          {getTroncateTitle(title)}
        </Typography>
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
