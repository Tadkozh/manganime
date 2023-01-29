import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  Box,
  Button,
  FavoriteRoundedIcon,
  Grid,
  Rating,
  Typography,
} from '../ui'

import { updateRating } from '../../database/user'
import { updateFavorite } from '../../database/user'
import Modale from './../Modal'
import InfoGalery from './InfoGalery'
import StatsDropdowns from '../stats/StatsDropdowns'

import StarIcon from '@mui/icons-material/Star'

function InfoPresentation({ info }) {
  const [userRank, setUserRank] = useState(false)
  const authUser = useAuth()
  // console.log(authUser)

  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: 'solid',
        }}
      >
        <PresentationTitle info={info} />
        <InfoGalery
          mainImage={info.coverImage.large}
          mainLargeImage={info.coverImage.extraLarge}
        />
        <RatingInfos info={info} userRank={userRank} changeRank={setUserRank} />
      </Grid>
      {/* {authUser.data ? <StatsDropdowns /> : null} */}
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

function HoverRating({
  name,
  defaultValue,
  nbStar,
  setNbStar,
  precision,
  readOnly,
}) {
  const [value, setValue] = useState(nbStar)
  const [hover, setHover] = useState(-1)

  const labels = {
    null: 'No opinion',
    0.5: 'Very bad 👿',
    1: 'Bad 👎',
    1.5: 'Poor 😑',
    2: 'Mediocre 😐',
    2.5: 'Ok 👍',
    3: 'Nice 🙂',
    3.5: 'Good 😎',
    4: 'Very good 🔥',
    4.5: 'Excellent 😍',
    5: 'Perfect! 💯',
  }

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Rating
          name={name}
          defaultValue={defaultValue}
          value={value}
          precision={precision}
          getLabelText={getLabelText}
          readOnly={readOnly}
          onChange={
            setNbStar
              ? (e, newNbStar) => {
                  setValue(newNbStar)
                  setNbStar(newNbStar)
                }
              : null
          }
          onChangeActive={
            setNbStar
              ? (e, newHover) => {
                  setHover(newHover)
                }
              : null
          }
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box>
          {labels[hover !== -1 ? hover : setNbStar ? value : Math.round(value)]}
        </Box>
      </Box>
    </Box>
  )
}

function RatingInfos({ info, userRank, changeRank }) {
  return (
    <div className="rating">
      <GlobalRating info={info} />
      <PersonalRating info={info} userRank={userRank} changeRank={changeRank} />
    </div>
  )
}

function GlobalRating({ info }) {
  return (
    <div>
      <Typography component="legend">Global score:</Typography>
      <HoverRating
        name={'Global rating'}
        defaultValue={info.meanScore / 20}
        nbStar={info.meanScore / 20}
        setNbStar={false}
        precision={0.1}
        readOnly={true}
      />
      <Button href="#reviews" variant="contained" size="small" color="success">
        REVIEWS
      </Button>
    </div>
  )
}

function PersonalRating({ info, userRank, changeRank }) {
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const [nbStar, setNbStar] = useState(null)

  const { data: authUser } = useAuth()
  let { type } = useParams()

  function handleClickRate() {
    if (authUser === null) {
      handleOpenModal()
    } else {
      if (nbStar !== null) {
        changeRank(!userRank)
        updateRating(type, info, nbStar, authUser)
      }
    }
  }

  return (
    <div>
      <Typography component="legend">Your Note:</Typography>
      <HoverRating
        name={'Personal rating'}
        defaultValue={null}
        nbStar={null}
        setNbStar={setNbStar}
        precision={0.5}
        readOnly={false}
      />
      <div>
        <Button
          variant="contained"
          size="small"
          color={userRank ? 'error' : 'success'}
          onClick={handleClickRate}
        >
          {userRank ? 'Cancel note' : 'Submit note'}
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
