import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Box,
  // Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from './../ui'

// Components
import { INFOS } from '../../commons/constants'
import { getUrl } from '../../utils/helper'

const RecommendationsCard = ({ data }) => {
  let { type } = useParams()

  const [showOverlay, setShowOverlay] = useState({
    status: false,
  })

  return (
    <Paper elevation={24}>
      <Card sx={{ maxWidth: 225 }}>
        <CardActionArea
          sx={{ position: 'relative' }}
          onMouseOver={(e) => {
            setShowOverlay({ status: true })
          }}
          onMouseLeave={() => {
            setShowOverlay({ status: false })
          }}
        >
          {/* <Link to={getUrl(type, INFOS, [data.id])}> */}
          <CardMedia
            height={335}
            component="img"
            image={data.coverImage.large}
            alt={data.title.english ?? data.title.romaji}
          />
          {/* </Link> */}

          {showOverlay.status && (
            <Link to={getUrl(type, INFOS, [data.id])}>
              <Box
                component="div"
                sx={{
                  position: 'absolute',
                  bgcolor: 'rgba(245, 136, 39, 0.3)',
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
        <CardContent sx={{ height: 140 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{ height: 64, textAlign: 'center' }}
          >
            {data.title.english ?? data.title.romaji}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* <Button
              variant="contained"
              href={data.entry.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </Button> */}
          </Box>
        </CardContent>
      </Card>
    </Paper>
  )
}

export default RecommendationsCard
