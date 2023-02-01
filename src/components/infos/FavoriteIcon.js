import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

import { Box, Typography } from '@mui/material'
import { FavoriteRoundedIcon } from '../ui'

import Modale from '../Modal'

import { updateFavorite } from '../../database/user'

function FavoriteIcon({ info }) {
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const { data: authUser, setData } = useAuth()

  const favourites = info.type === 'ANIME' ? 'favorite_anime' : 'favorite_manga'
  const color = () => (authUser[favourites].includes(info.id) ? true : false)
  const [isFav, setIsFav] = useState(authUser ? color : false)
  console.log('isFav', isFav)

  const handleClickFav = async () => {
    if (authUser === null) {
      handleOpenModal()
    } else {
      setIsFav(!isFav)
      const newUser = await updateFavorite(info, authUser)
      setData(newUser)
      console.log(newUser)
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
          {/* {isFav ? info.favourites + 1 : info.favourites} */}
        </Typography>
      </Box>
    )
  )
}

export default FavoriteIcon
