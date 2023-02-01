import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'

import { Button, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'

import StarIcon from '@mui/icons-material/Star'

import Modale from '../Modal'

import { updateRating } from '../../database/user'
import { labels } from './scoreLabels'

function RatingItem({
  name,
  defaultValue,
  nbStar,
  precision,
  isReadOnly,
  onChange,
  onChangeActive,
  hover,
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Rating
        name={name}
        defaultValue={defaultValue}
        value={nbStar}
        precision={precision}
        readOnly={isReadOnly}
        onChange={onChange}
        onChangeActive={onChangeActive}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Typography>
        {
          labels[
            hover !== -1
              ? hover
              : !isReadOnly
              ? nbStar
              : Math.floor(defaultValue * 2) * 0.5
          ]
        }
      </Typography>
    </Box>
  )
}

function PersonalRating({ info }) {
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const [hover, setHover] = useState(-1)
  const [nbStar, setNbStar] = useState(null)

  const { data: authUser } = useAuth()

  function handleClickRate(e, newNbStar) {
    if (authUser === null) {
      handleOpenModal()
    } else {
      setNbStar(newNbStar)
    }
  }

  useEffect(() => {
    if (authUser) {
      updateRating(info, nbStar, authUser)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nbStar])

  console.log('note ch', nbStar)

  return (
    <Box>
      <RatingItem
        name={'Personal rating'}
        defaultValue={null}
        nbStar={nbStar}
        precision={0.5}
        isReadOnly={false}
        onChange={(e, newNbStar) => handleClickRate(e, newNbStar)}
        onChangeActive={(e, newHover) => {
          setHover(newHover)
        }}
        hover={hover}
      />

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

function GlobalRating({ info }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Typography component="legend">Global note:</Typography>
      <RatingItem
        name={'Global rating'}
        defaultValue={info.meanScore / 20}
        nbStar={info.meanScore / 20}
        precision={0.1}
        isReadOnly={true}
        onChange={null}
        onChangeActive={null}
        hover={-1}
      />
      <Button
        href="#reviews"
        variant="contained"
        size="small"
        color="success"
        sx={{ mt: '5px' }}
      >
        Read reviews
      </Button>
    </Box>
  )
}

export { GlobalRating, PersonalRating }
