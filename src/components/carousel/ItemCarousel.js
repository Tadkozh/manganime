import React from 'react'
import { getUrl } from '../../utils/helper'
import { Box, Card, Link, Typography } from '../ui'

const WatchItemCarousel = ({ data }) => {
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
            <Link
              href={getUrl(data?.type, 'infos', [data?.id])}
              underline="hover"
              sx={{
                color: 'inherit',
                textDecorationColor: 'inherit',
                cursor: 'pointer',
              }}
            >
              {data?.title?.english ?? data?.title?.romaji}
            </Link>
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
            <Typography variant="h5" component="p">
              <Link
                href={
                  data?.streamingEpisodes[data?.streamingEpisodes?.length - 1]
                    ?.url
                }
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontWeight: 'bold',
                  color: 'blue',
                  textDecorationColor: 'blue',
                  textShadow: '#fff 1px 0 0',
                  cursor: 'pointer',
                }}
              >
                Watch
              </Link>
            </Typography>
          </Card>
        </Card>
      </Box>
    </>
  )
}

export default WatchItemCarousel
