import { useState } from 'react'

import { Button, Rating, Typography } from '@mui/material'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { useParams } from 'react-router-dom'
import { ANIME } from '../../commons/constants'

function Presentation({ info }) {
  let { type } = useParams()

  const [rank, setRank] = useState(false)

  return (
    <>
      <div className="presentation">
        <PresentationTitle info={info} />
        <img src={info.images.jpg.image_url} alt="infos" className="mainImg" />
        {type === ANIME ? <Trailer streaming={info.streaming} /> : null}
        <RateInfos info={info} rank={rank} changeRank={setRank} />
      </div>
    </>
  )
}

function FavoriteIcon({ favorites }) {
  const [isFav, setIsFav] = useState(false)

  return (
    <div className="favIcon">
      <FavoriteRoundedIcon
        fontSize="large"
        onClick={() => setIsFav(!isFav)}
        className={isFav ? 'star fav' : 'star notFav'}
      />
      <p>{isFav ? favorites + 1 : favorites}</p>
    </div>
  )
}

const PresentationTitle = ({ info }) => {
  return (
    <div className="titles">
      <h2>{info.title_english ?? info.titles[0].title}</h2>
      <p className="japaneseTitle">{info.title_japanese}</p>
      <p>Rank: {info.rank}</p>
      <FavoriteIcon favorites={info.favorites} />
    </div>
  )
}
const Trailer = ({ streaming }) => {
  return streaming[0] ? (
    <>
      <a href="#trailer">WATCH TRAILER</a>
      <Button href={streaming[0]?.url} variant="contained" size="small">
        WATCH STREAMING
        <br />
        On {streaming[0]?.name}
      </Button>
    </>
  ) : null
}

const RateInfos = ({ info, rank, changeRank }) => {
  return (
    <div className="rating">
      <GlobalRate info={info} rank={rank} />
      <PersonalRate rank={rank} changeRank={changeRank} />
    </div>
  )
}

const GlobalRate = ({ info, rank }) => {
  return (
    <div>
      <Typography component="legend">Global score:</Typography>
      <Rating
        name="rating"
        defaultValue={info.score / 2}
        precision={0.1}
        readOnly
      />
      <p>
        <small>
          (
          {info?.scored_by
            ? rank
              ? `On ${info.scored_by + 1} notes`
              : `On ${info.scored_by} notes`
            : 'No notes yet'}
          )
        </small>
      </p>
    </div>
  )
}

const PersonalRate = ({ rank, changeRank }) => {
  return (
    <div>
      <Typography component="legend">Your score:</Typography>
      <Rating
        name="rating"
        defaultValue={null}
        precision={0.5}
        readOnly={rank ? true : false}
      />
      <div>
        <Button
          variant="contained"
          size="small"
          color={rank ? 'error' : 'success'}
          onClick={() => changeRank(!rank)}
        >
          {rank ? 'Annuler la note' : 'Valider la note'}
        </Button>
      </div>
    </div>
  )
}

export default Presentation
