import React from 'react'
import ItemCarousel from './ItemCarousel'
import { Carousel, Paper, Typography } from '../ui'
import { useTheme } from '@mui/material'
import { useEpisode } from '../../hooks/queriesHooks'

const CarouselBox = () => {
  const theme = useTheme()
  const episodes = useEpisode()

  return (
    <Paper
      elevation={4}
      component="article"
      sx={{
        bgcolor: theme.palette.background.content,
        borderRadius: 'inherit',
        m: '1em 0 0 0',
      }}
    >
      <Carousel sx={{}}>
        {episodes?.Page?.media.map((episode, index) => (
          <ItemCarousel
            data={episode}
            key={index}
            sx={{ background: 'black' }}
          ></ItemCarousel>
        ))}
      </Carousel>
    </Paper>
  )
}

export default CarouselBox
