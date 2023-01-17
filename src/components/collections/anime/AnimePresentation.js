import { useState } from 'react'

import { Button, Rating, Typography } from '@mui/material'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'

function FavoriteIcon({ getInfo }) {
  const [isFav, setIsFav] = useState(false)

  return (
    <div className="favIcon">
      <FavoriteRoundedIcon
        fontSize="large"
        onClick={() => setIsFav(!isFav)}
        className={isFav ? 'star fav' : 'star notFav'}
      />
      <p>{isFav ? getInfo.data.favorites + 1 : getInfo.data.favorites}</p>
    </div>
  )
}

function AnimePresentation({ getInfo }) {
  const [rankBtnValue, setRankBtnValue] = useState(false)

  return (
    <>
      <div className="presentation">
        <div className="titles">
          <h2>{getInfo.data.title_english ?? getInfo.data.titles[0].title}</h2>
          <p className="japaneseTitle">{getInfo.data.title_japanese}</p>
          <p>Rank: {getInfo.data.rank}</p>
          <FavoriteIcon getInfo={getInfo} />
        </div>

        <img
          src={getInfo.data.images.jpg.image_url}
          alt="infos"
          className="mainImg"
        />
        <a href="#trailer">WATCH TRAILER</a>
        {getInfo.data.streaming[0]?.name ? (
          <Button
            href={getInfo.data.streaming[0].url}
            variant="contained"
            size="small"
          >
            WATCH STREAMING
            <br />
            On {getInfo.data.streaming[0].name}
          </Button>
        ) : null}

        <div className="rating">
          <div>
            <Typography component="legend">Global score:</Typography>
            <Rating
              name="rating"
              defaultValue={getInfo.data.score / 2}
              precision={0.1}
              readOnly
            />
            <p>
              <small>
                (
                {getInfo?.data?.scored_by
                  ? rankBtnValue
                    ? `On ${getInfo.data.scored_by + 1} notes`
                    : `On ${getInfo.data.scored_by} notes`
                  : 'No notes yet'}
                )
              </small>
            </p>
          </div>
          <div>
            <Typography component="legend">Your score:</Typography>
            <Rating
              name="rating"
              defaultValue={null}
              precision={0.5}
              readOnly={rankBtnValue ? true : false}
            />
            <div>
              <Button
                variant="contained"
                size="small"
                color={rankBtnValue ? 'error' : 'success'}
                onClick={() => setRankBtnValue(!rankBtnValue)}
              >
                {rankBtnValue ? 'Annuler la note' : 'Valider la note'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AnimePresentation
