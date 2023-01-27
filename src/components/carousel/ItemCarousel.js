import React from 'react'
import { Link } from 'react-router-dom'
import { getUrl } from '../../utils/helper'
import { Box, Card, Typography } from '../ui'

const WatchItemCarousel = ({ data }) => {
  console.log(data)
  console.log('id', data.id)

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          minHeight: '50vh',
          width: '100%',
          backgroundImage: `url(${data?.bannerImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Card
          sx={{
            position: 'absolute',
            top: '40%',
            left: 'auto',
            p: '1em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
            bgcolor: 'rgba(255, 255, 255,0.3)',
            borderRadius: '0.4em',
            boxShadow: 'inset 0 0 10px #000, 0 0 9px 3px #000',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              maxWidth: '15em',
              textAlign: 'left',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              textShadow: '#fff 1px 0 0',
            }}
          >
            {data?.title?.english ?? data?.title?.romaji}
          </Typography>

          <Card
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              width: '100%',
              color: 'black',
              bgcolor: 'transparent',
              boxShadow: 'none',
              gap: '50px',
            }}
          >
            <Typography
              variant="h5"
              component="p"
              sx={{
                textDecoration: 'none',
                fontWeight: 'bold',
                color: 'blue',
                textShadow: '#fff 1px 0 0',
              }}
            >
              <Link to={getUrl('ANIME', 'infos', [data.id])}>Infos</Link>
            </Typography>

            <Typography
              variant="h5"
              component="a"
              href={
                data.streamingEpisodes[data.streamingEpisodes.length - 1].url
              }
              sx={{
                textDecoration: 'none',
                fontWeight: 'bold',
                color: 'blue',
                textShadow: '#fff 1px 0 0',
              }}
            >
              Watch
            </Typography>
          </Card>
        </Card>
      </Box>
    </>
  )
}

export default WatchItemCarousel
