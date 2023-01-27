import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Button, FavoriteRoundedIcon, Rating, Typography } from '../ui'

import { updateRating } from '../../database/user'
import { updateFavorite } from '../../database/user'
import Modale from './../Modal'
import InfoGalery from './InfoGalery'
import StatsDropdowns from '../stats/StatsDropdowns'

function InfoPresentation({ info }) {
  const [userRank, setUserRank] = useState(false)
  const authUser = useAuth()
  // console.log(authUser)

  return (
    <>
      <div className="presentation">
        <PresentationTitle info={info} />
        <InfoGalery
          mainImage={info.coverImage.large}
          mainLargeImage={info.coverImage.extraLarge}
        />
        <RateInfos info={info} userRank={userRank} changeRank={setUserRank} />
      </div>
      {authUser.data ? <StatsDropdowns /> : null}
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

function RateInfos({ info, userRank, changeRank }) {
  return (
    <div className="rating">
      <GlobalRate info={info} userRank={userRank} />
      <PersonalRate info={info} userRank={userRank} changeRank={changeRank} />
    </div>
  )
}

function GlobalRate({ info, userRank }) {
  return (
    <div>
      <Typography component="legend">Global score:</Typography>
      <Rating
        name="rating"
        defaultValue={info.meanScore / 20}
        precision={0.1}
        readOnly
      />
      <p>
        <small>
          (
          {info.meanScore
            ? userRank
              ? `On ${info.meanScore + 1} notes`
              : `On ${info.meanScore} notes`
            : 'No notes yet'}
          )
        </small>
      </p>
    </div>
  )
}

function PersonalRate({ info, userRank, changeRank }) {
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
      changeRank(!userRank)
      updateRating(type, info, nbStar, authUser)
    }
  }

  return (
    <div>
      <Typography component="legend">Your Note:</Typography>
      <Rating
        name="rating"
        defaultValue={null}
        precision={0.5}
        readOnly={userRank ? true : false}
        value={nbStar}
        onChange={(event, newNbStar) => {
          setNbStar(newNbStar)
        }}
      />
      <div>
        <Button
          variant="contained"
          size="small"
          color={userRank ? 'error' : 'success'}
          onClick={handleClickRate}
        >
          {userRank ? 'Cancel' : 'Submit your note'}
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
