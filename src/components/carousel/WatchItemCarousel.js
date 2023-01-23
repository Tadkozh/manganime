import React from 'react'
import { Box, Card, CardContent, CardMedia, Typography } from '../ui'

const WatchItemCarousel = ({ type, options = '', limit = '' }) => {
  const [watchDatas, setWatchDatas] = React.useState('')
  console.log(watchDatas)

  React.useEffect(() => {
    setWatchDatas(type)
  }, [type])
  console.log(type)

  return (
    <>
      <CardMedia
        component="img"
        image={type?.entry?.images?.jpg?.large_image_url}
        title={type?.entry?.title}
        sx={{ width: '430px', height: '600px' }}
      />
      {/* <img
        src={type?.entry?.images?.jpg?.large_image_url}
        alt={type?.entry?.title}
        style={{ width: '430px', height: '600px' }}
      /> */}
      {/* <Box sx={{ display: 'flex', gap: '1em' }}> */}
      {/* <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          textTransform: 'uppercase',
          marginLeft: '1em',
          // width: '15em',
        }}
      >
        {type?.entry?.title}
      </Typography>
      <Card sx={{}}>
        <CardMedia
          component="img"
          image={type?.entry?.images?.jpg?.large_image_url}
          title={type?.entry?.title}
          sx={{ width: '100%', height: 'auto' }}
        />
      </Card> */}
      {/* </Box> */}
    </>
  )
}

export default WatchItemCarousel
