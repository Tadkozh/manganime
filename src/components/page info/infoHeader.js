import { useState } from 'react'

import { Button, Rating } from '@mui/material'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
// import StarRoundedIcon from '@mui/icons-material/StarRounded'

function FavIcon({ getInfo }) {
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

function InfoHeader({ getInfo }) {
  const [rankBtnValue, setRankBtnValue] = useState(false)

  return (
    <>
      <div className="infoHeader">
        <div className="titles">
          <h2>{getInfo.data.title_english}</h2>
          <p className="japaneseTitle">{getInfo.data.title_japanese}</p>
          <p>Rank: {getInfo.data.rank}</p>
          <FavIcon getInfo={getInfo} />
        </div>

        <img
          src={getInfo.data.images.jpg.image_url}
          alt="infos"
          className="mainImg"
        />
        <a href="#trailer">WATCH TRAILER</a>
        {getInfo.data.streaming[0]?.name ? (
          <Button variant="contained" size="small">
            WATCH STREAMING
            <br />
            On {getInfo.data.streaming[0]?.name}
          </Button>
        ) : null}

        <div className="rating">
          <div>
            <p>Global score:</p>
            <Rating
              name="rating"
              defaultValue={getInfo.data.score / 2}
              precision={0.1}
              readOnly
            />
            <p>
              <small>
                (On{' '}
                {rankBtnValue
                  ? getInfo.data.scored_by + 1
                  : getInfo.data.scored_by}{' '}
                notes)
              </small>
            </p>
          </div>
          <div>
            <p>Your score:</p>
            <Rating
              name="rating"
              defaultValue={1}
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

export default InfoHeader
