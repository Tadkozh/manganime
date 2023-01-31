import { useAuth } from '../../context/AuthContext'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

import { Button, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'

import StarIcon from '@mui/icons-material/Star'

import Modale from '../Modal'

import { updateRating } from '../../database/user'
import { labels } from './scoreLabels'
import { useRating } from '../../hooks/queriesHooks'

function RatingInfos() {
  let { type, id } = useParams()
  const data = useRating(type, id)
  const info = data?.Page?.media[0]

  return (
    info && (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
          width: '100%',
          textAlign: 'center',
          margin: '5px auto',
        }}
      >
        <GlobalRating info={info} />
        <PersonalRating info={info} />
      </Box>
    )
  )
}

function RatingItem({
  name,
  defaultValue,
  nbStar,
  setNbStar,
  precision,
  isReadOnly,
}) {
  const [value, setValue] = useState(nbStar)
  const [hover, setHover] = useState(-1)
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Rating
        name={name}
        defaultValue={defaultValue}
        value={value}
        precision={precision}
        readOnly={isReadOnly}
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
      <Typography>
        {
          labels[
            hover !== -1
              ? hover
              : setNbStar
              ? value
              : Math.floor(value * 2) * 0.5
          ]
        }
      </Typography>
    </Box>
  )
}

function GlobalRating({ info }) {
  return (
    <Box>
      <Typography component="legend">Global note:</Typography>
      <RatingItem
        name={'Global rating'}
        defaultValue={info.meanScore / 20}
        nbStar={info.meanScore / 20}
        setNbStar={false}
        precision={0.1}
        isReadOnly={true}
      />
      <Button href="#reviews" variant="contained" size="small" color="success">
        Read reviews
      </Button>
    </Box>
  )
}

function PersonalRating({ info }) {
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const [nbStar, setNbStar] = useState(null)
  const [hasUserNoted, setHasUserNoted] = useState(false)

  const { data: authUser } = useAuth()

  function handleClickRate() {
    if (authUser === null) {
      handleOpenModal()
    } else {
      if (nbStar !== null) {
        setHasUserNoted(!hasUserNoted)
        updateRating(info, nbStar, authUser)
      }
    }
  }

  return (
    <Box>
      <Typography component="legend">Your note:</Typography>
      <RatingItem
        name={'Personal rating'}
        defaultValue={null}
        nbStar={null}
        setNbStar={setNbStar}
        precision={0.5}
        isReadOnly={hasUserNoted ? true : false}
      />
      <Button
        variant="contained"
        size="small"
        color={hasUserNoted ? 'error' : 'success'}
        onClick={handleClickRate}
      >
        {hasUserNoted ? 'Cancel note' : 'Submit note'}
      </Button>
      {open && (
        <Modale
          open={open}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </Box>
  )
}

export default RatingInfos
