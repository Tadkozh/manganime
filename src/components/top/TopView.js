import React from 'react'
import { Link } from 'react-router-dom'
import { INFOS } from '../../commons/constants'
import { getUrl } from '../../utils/helper'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from '../ui'
import { useTheme } from '@mui/material'

const TopView = ({ datas, isHomePage = false, type, rank }) => {
  const [showOverlay, setShowOverlay] = React.useState({
    status: false,
    index: null,
  })

  const theme = useTheme()

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

  const sxTopLiTitle = {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: '0.2em',
    overflow: isHomePage ? 'hidden' : 'inherit',
    whiteSpace: isHomePage ? 'nowrap' : 'inherit',
    textOverflow: isHomePage ? 'ellipsis' : 'inherit',
  }

  return (
    <Box component="ul" sx={sxTopBox}>
      {datas.map((data, index) => {
        return (
          <Paper
            key={index}
            title={`${type.toLowerCase()}-list`}
            component="li"
            sx={{
              backgroundImage: 'inherit',
              bgcolor: 'inherit',
              boxShadow: 'inherit',
              position: 'relative',
            }}
          >
            <Typography
              component="p"
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                marginTop: '0.2em',
                position: 'absolute',
                top: '0.4em',
                zIndex: '2',
                left: '-1em',
                height: '3em',
                width: '3em',
                borderRadius: '50%',
                m: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: theme.palette.background.topIcon,
                boxShadow: `inset 0 0 10px ${theme.palette.background.topIcon}, 0 0 9px 3px ${theme.palette.background.topIcon}`,
              }}
            >
              #{rank + index}
            </Typography>
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
                  image={data?.coverImage?.extraLarge}
                  alt={data?.title?.romaji ?? data?.title?.english}
                />
                {showOverlay?.status && showOverlay?.index === index && (
                  <Link to={getUrl(type, INFOS, [data?.id])}>
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
                <Typography component="h5" sx={sxTopLiTitle}>
                  {data?.title?.romaji ?? data?.title?.english}
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
