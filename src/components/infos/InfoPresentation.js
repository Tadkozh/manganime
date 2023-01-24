import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ANIME, ID } from '../../commons/constants'
import { Button, FavoriteRoundedIcon, Rating, Typography } from '../ui'
import { useAuth } from '../../context/AuthContext'
import { updateUser } from '../../database/operations'

import InfoGalery from './InfoGalery'
import Modale from './../Modal'

function InfoPresentation({ info }) {
  let { type } = useParams()
  const [rank, setRank] = useState(false)

  return (
    <>
      <div className="presentation">
        <PresentationTitle info={info} />
        <InfoGalery
          mainImage={info.images.jpg.image_url}
          mainLargeImage={info.images.jpg.large_image_url}
        />
        {type === ANIME ? <Trailer streaming={info.streaming} /> : null}
        <RateInfos info={info} rank={rank} changeRank={setRank} />
      </div>
    </>
  )
}

function PresentationTitle({ info }) {
  return (
    <div className="titles">
      <h2>{info.title_english ?? info.titles[0].title}</h2>
      <p className="japaneseTitle">{info.title_japanese}</p>
      <FavoriteIcon favorites={info.favorites} />
    </div>
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

function Trailer({ streaming }) {
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

  const [value, setValue] = useState(0)
  console.log(value)

  const { data: authUser, getUid } = useAuth()
  let { type } = useParams()

  const handleClick = () => {
    // changeRank(!rank)
    console.log('authUser', authUser)
    if (authUser === null) {
      handleOpenModal()
    } else {
      changeRank(!rank)

      const newUser = structuredClone(authUser)
      const type_opinion = type === 'anime' ? 'anime_opinion' : 'manga_opinion'
      const type_id = type === 'anime' ? 'anime_id' : 'manga_id'

      const isAnimeId = newUser[type_opinion].some(
        (opinion) => opinion.anime_id === info.mal_id,
      )
      if (isAnimeId) {
        newUser[type_opinion].map((opinion) => {
          if (opinion.anime_id === info.mal_id) {
            opinion.rate = value
          }
        })
      } else {
        const ratedb = { rate: value, [type_id]: info.mal_id }
        newUser[type_opinion].push(ratedb)
      }
      const userId = getUid()
      console.log('newUser', newUser)

      updateUser(userId, newUser)
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
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      />
      <div>
        <Button
          variant="contained"
          size="small"
          color={rank ? 'error' : 'success'}
          // onClick={() => changeRank(!rank)}
          onClick={handleClick}
        >
          {rank ? 'Cancel the note' : 'Submit the note'}
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
