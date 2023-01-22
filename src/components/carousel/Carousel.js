import React from 'react'
import WatchItemCarousel from './WatchItemCarousel'
import { useWatch } from '../../hooks/queriesHooks'
import { EPISODES } from '../../commons/constants'
import { Box } from '../ui'

const Carousel = () => {
  const recentEpisodes = useWatch(EPISODES)
  // console.log(recentEpisodes)

  return (
    <Box>
      <WatchItemCarousel type={recentEpisodes}></WatchItemCarousel>
    </Box>
  )
}

export default Carousel
