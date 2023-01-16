import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import '../styles/top-css.css'

const TopView = ({ datas }) => {
  const [showOverlay, setShowOverlay] = React.useState({
    status: false,
    index: null,
  })

  return (
    <ul className="datagrid top-article--box">
      {datas.map((data, index) => {
        return (
          <li
            key={index}
            title={`${data.genres[0].type}-list`}
            className="top-article--box-item"
          >
            <Card
              sx={{
                maxWidth: '16em',
                boxShadow: 'inherit',
                backgroundImage: 'inherit',
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
                  image={data.images.jpg.image_url}
                  alt={data.title}
                />
                {showOverlay.status && showOverlay.index === index && (
                  <div className="top-article--box-item-media" />
                )}
              </CardActionArea>
              <CardContent sx={{ padding: 0 }}>
                <Typography
                  gutterBottom
                  component="h5"
                  sx={{ textTransform: 'uppercase' }}
                >
                  {data.title}
                </Typography>
              </CardContent>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}

export default TopView
