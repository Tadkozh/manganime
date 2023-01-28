import { useParams } from 'react-router-dom'
import { useStreaming } from '../../hooks/queriesHooks'

import NavBarInfoTabs from '../NavBarInfoTabs'
import { Button, Card, CardMedia, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'

function Streaming() {
  let { type, id } = useParams()
  const theme = useTheme()

  const data = useStreaming(type, id)
  const info = data?.Page?.media[0]?.streamingEpisodes

  // sx={{color: theme.palette.text.primary}}

  return info ? (
    <>
      <NavBarInfoTabs />
      <Typography
        component="h2"
        variant="h3"
        sx={{ textAlign: 'center', m: '10px auto 25px' }}
      >
        Watch streaming on {info[0]?.site}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 225px)',
          justifyContent: 'center',
          gap: '25px',
          m: '0 25px',
        }}
      >
        {info.map((data, index) => {
          return (
            <Card
              key={index}
              component="a"
              href={data.url}
              target="_blank"
              rel="noreferrer"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '10px',
                height: '100%',
                textDecoration: 'none',
                p: '10px',
                borderRadius: '10px',
                '&:hover img': {
                  transform: 'scale(1.25)',
                },
              }}
            >
              <Box
                component="div"
                sx={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  image={data.thumbnail}
                  alt={data?.title}
                  sx={{
                    width: '100%',
                  }}
                />
              </Box>
              <Typography component="h3">{data.title}</Typography>
              <Button variant="contained">Watch on {data.site}</Button>
            </Card>
          )
        })}
      </Box>
    </>
  ) : null
}

export default Streaming
