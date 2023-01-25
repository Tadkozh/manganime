import React from 'react'
import { Box, Card, CardContent, CardMedia, Typography } from '../ui'

const WatchItemCarousel = ({ data }) => {
  console.log(data)

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {data?.title?.romaji}
        </Typography>
        <CardMedia
          component="img"
          image={data?.coverImage?.extraLarge}
          title={data?.title?.romaji}
          sx={{ height: '44em', width: 'inherit' }}
        />
        <Typography
          variant="h5"
          component="a"
          href={data.streamingEpisodes[data.streamingEpisodes.length - 1].url}
          sx={{ textDecoration: 'none' }}
        >
          Watch
        </Typography>
      </Box>
    </>
  )
}

export default WatchItemCarousel
