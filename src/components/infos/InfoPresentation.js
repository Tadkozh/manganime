import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ANIME } from '../../commons/constants'
import { useAuth } from '../../context/AuthContext'
import { Button, FavoriteRoundedIcon, Rating, Typography } from '../ui'

import { updateRating } from '../../database/user'
import { updateFavorite } from '../../database/user'
import Modale from './../Modal'
import InfoGalery from './InfoGalery'

function InfoPresentation({ info }) {
  let { type } = useParams()
  const [rank, setRank] = useState(false)

  return (
    <>
      <div className="presentation">
        <PresentationTitle info={info} />
        {/* <InfoGalery
          mainImage={info.coverImage.large}
          mainLargeImage={info.coverImage.extraLarge}
        /> */}
        {type === ANIME ? <Trailer streaming={info.streamingEpisodes} /> : null}
        {/* <RateInfos info={info} rank={rank} changeRank={setRank} /> */}
      </div>
    </>
  )
}

function PresentationTitle({ info }) {
  return (
    <div className="titles">
      <h2>{info.title.english ?? info.title.romaji}</h2>
      <p className="japaneseTitle">{info.title.native}</p>
      <FavoriteIcon info={info} favourites={info.favourites} />
    </div>
  )
}

function FavoriteIcon({ info, favourites }) {
  const [isFav, setIsFav] = useState(false)

  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const { data: authUser } = useAuth()
  let { type } = useParams()

  const handleClickFav = () => {
    if (authUser === null) {
      handleOpenModal()
    } else {
      setIsFav(!isFav)
      updateFavorite(type, info, authUser)
    }
  }

  return (
    <div className="favIcon">
      <FavoriteRoundedIcon
        fontSize="large"
        // onClick={() => setIsFav(!isFav)}
        onClick={handleClickFav}
        className={isFav ? 'star fav' : 'star notFav'}
      />
      {open && (
        <Modale
          open={open}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
      )}
      <p>{isFav ? favourites + 1 : favourites}</p>
    </div>
  )
}

function Trailer({ streaming }) {
  return (
    <>
      <a href="#trailer">WATCH TRAILER</a>
      <Button href={streaming.url} variant="contained" size="small">
        WATCH STREAMING
        <br />
        On {streaming.site}
      </Button>
    </>
  )
}

function RateInfos({ info, rank, changeRank }) {
  return (
    <div className="rating">
      <GlobalRate info={info} rank={rank} />
      <PersonalRate info={info} rank={rank} changeRank={changeRank} />
    </div>
  )
}

function GlobalRate({ info, rank }) {
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

function PersonalRate({ info, rank, changeRank }) {
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const [nbStar, setNbStar] = useState(0)

  const { data: authUser } = useAuth()
  let { type } = useParams()

  const handleClickRate = () => {
    if (authUser === null) {
      handleOpenModal()
    } else {
      changeRank(!rank)
      updateRating(type, info, nbStar, authUser)
    }
  }

  return (
    <div>
      <Typography component="legend">Your score:</Typography>
      <Rating
        name="rating"
        defaultValue={null}
        precision={0.5}
        readOnly={rank ? true : false}
        value={nbStar}
        onChange={(event, newNbStar) => {
          setNbStar(newNbStar)
        }}
      />
      <div>
        <Button
          variant="contained"
          size="small"
          color={rank ? 'error' : 'success'}
          onClick={handleClickRate}
        >
          {rank ? 'Cancel' : 'Submit your note'}
        </Button>
        {open && (
          <Modale
            open={open}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
    </div>
  )
}

export default InfoPresentation
