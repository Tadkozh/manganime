import React from 'react'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

// import '../styles/top-css.css'

const TopView = ({ datas, isHomePage = false }) => {
  const [showOverlay, setShowOverlay] = React.useState({
    status: false,
    index: null,
  })

  const sxTopBox = {
    height: isHomePage ? '502px' : 'inherit',
    marginTop: '1em',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 350px)',
    justifyItems: 'center',
    justifyContent: 'center',
    gap: '30px',
  }

  return (
    <Box component="ul" sx={sxTopBox}>
      {datas.map((data, index) => {
        return (
          <Paper
            key={index}
            title={`${data?.genres[0]?.type}-list`}
            component="li"
            sx={{
              backgroundImage: 'inherit',
              bgcolor: 'inherit',
              boxShadow: 'inherit',
            }}
          >
            <Card
              sx={{
                maxWidth: '16em',
                p: '1em 0',
                backgroundImage: 'inherit',
                bgcolor: 'inherit',
                boxShadow: 'inherit',
              }}
            >
              <CardActionArea
                sx={{ position: 'relative' }}
                onMouseOver={(e) => {
                  e.target.key = index
                  setShowOverlay({ status: true, index: index })
                }}
                onMouseLeave={() => {
                  setShowOverlay({ status: false, index: null })
                }}
              >
                <CardMedia
                  component="img"
                  height="400"
                  sx={{ objectFit: 'inherit', transition: 'all 0.2s ease' }}
                  image={data?.images?.jpg?.image_url}
                  alt={data?.title_english ?? data?.title}
                />
                {showOverlay.status && showOverlay.index === index && (
                  <Link
                    to={`/collection/${
                      data?.type === 'manga' ? 'manga' : 'anime'
                    }/search/main/${data?.mal_id}/${
                      data?.title_english ?? data?.title
                    }`}
                  >
                    {/* <div className="top-article__box__item__media-effect" /> */}
                    <Box
                      component="div"
                      sx={{
                        position: 'absolute',
                        bgcolor: 'rgba(68, 68, 68, 0.4)',
                        width: '100%',
                        height: '100%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: '1',
                      }}
                    />
                  </Link>
                )}
              </CardActionArea>
              <CardContent sx={{ p: 0 }}>
                <Typography
                  component="h5"
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    marginTop: '0.2em',
                  }}
                >
                  {data?.title_english ?? data?.title}
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        )
      })}
    </Box>
  )
}

export default TopView
