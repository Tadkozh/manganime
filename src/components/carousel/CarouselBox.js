import React from 'react'
import WatchItemCarousel from './WatchItemCarousel'
import { useWatch } from '../../hooks/queriesHooks'
import { EPISODES } from '../../commons/constants'
import { Carousel, Paper } from '../ui'
import { useTheme } from '@mui/material'

const CarouselBox = () => {
  const theme = useTheme()
  const recentEpisodes = useWatch(EPISODES)
  console.log(recentEpisodes)

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
      <Carousel sx={{ maxHeight: '70vh' }}>
        {recentEpisodes?.map((watchItem, index) => (
          <WatchItemCarousel type={watchItem} key={index}></WatchItemCarousel>
        ))}
      </Carousel>
    </Paper>
  )
}

export default CarouselBox
