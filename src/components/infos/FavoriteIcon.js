import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

import { Box, Typography } from '@mui/material'
import { FavoriteRoundedIcon } from '../ui'

import Modale from '../Modal'

import { updateFavorite } from '../../database/user'

function FavoriteIcon({ info }) {
  const [isFav, setIsFav] = useState(false)

  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const { data: authUser } = useAuth()

  const handleClickFav = () => {
    if (authUser === null) {
      handleOpenModal()
    } else {
      setIsFav(!isFav)
      updateFavorite(info, authUser)
    }
  }

  return (
    info && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: '0',
          right: '5px',
        }}
      >
        <FavoriteRoundedIcon
          fontSize="large"
          onClick={handleClickFav}
          style={{ color: isFav ? 'red' : 'grey' }}
        />
        {open && (
          <Modale
            open={open}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        )}
        <Typography
          sx={{
            fontSize: '0.75rem',
          }}
        >
          {isFav ? info.favourites + 1 : info.favourites}
        </Typography>
      </Box>
    )
  )
}

export default FavoriteIcon
