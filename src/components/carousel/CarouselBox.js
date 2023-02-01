import React from 'react'
import ItemCarousel from './ItemCarousel'
import { Carousel, Paper } from '../ui'
import { useTheme } from '@mui/material'
import { useEpisode } from '../../hooks/queriesHooks'
import { LOADING, SUCCESS } from '../../commons/constants'
import { CarouselSkeleton } from '../skeletons/CarouselSkeleton'

const CarouselBox = () => {
  const theme = useTheme()
  const { data: episodes, status } = useEpisode()

  if (status === LOADING) {
    return <CarouselSkeleton />
  }

  if (status === SUCCESS) {
    return (
      <Paper
        elevation={20}
        component="article"
        sx={{
          bgcolor: theme.palette.background.content,
          borderRadius: 'inherit',
          m: '1em 0 0 0',
        }}
      >
        <Carousel>
          {episodes?.Page?.media.map((episode, index) => (
            <ItemCarousel data={episode} key={index}></ItemCarousel>
          ))}
        </Carousel>
      </Paper>
    )
  }
}

export default CarouselBox
