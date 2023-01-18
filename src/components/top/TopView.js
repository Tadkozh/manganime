import React from 'react'
import { Link } from 'react-router-dom'
import { INFOS } from '../../commons/constants'
import '../../styles/top-css.css'
import { getUrl } from '../../utils/helper'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '../ui'

const TopView = ({ datas, isHomePage = false, type }) => {
  const [showOverlay, setShowOverlay] = React.useState({
    status: false,
    index: null,
  })

  return (
    <ul
      className={
        isHomePage
          ? 'top-article__box'
          : 'top-article__box--noheight top-article__box'
      }
    >
      {datas.map((data, index) => {
        return (
          <li key={index} title={`${data?.genres[0]?.type}-list`}>
            <Card
              sx={{
                maxWidth: '16em',
                p: '1em 0',
                boxShadow: 'inherit',
                backgroundImage: 'inherit',
                bgcolor: 'inherit',
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
                    // to={`/collection/${
                    //   data?.type === 'manga' ? 'manga' : 'anime'
                    // }/search/main/${data?.mal_id}/${
                    //   data?.title_english ?? data?.title
                    // }`}
                    to={getUrl(type, INFOS, [data?.mal_id])}
                  >
                    <div className="top-article__box__item__media-effect" />
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
          </li>
        )
      })}
    </ul>
  )
}

export default TopView
