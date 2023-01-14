import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import '../styles/common-css.css'
import '../styles/topview-css.css'

const TopView = ({ datas }) => {
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
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="400"
                  sx={{ objectFit: 'inherit' }}
                  image={data.images.jpg.image_url}
                  alt={data.title}
                />
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
