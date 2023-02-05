import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

import { Box, FavoriteRoundedIcon } from '../ui'

import Modale from '../Modal'

import { getTypeFavourite, updateFavorite } from '../../database/user'

function FavoriteIcon({ info }) {
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const { data: authUser, setData } = useAuth()

  const favourites = getTypeFavourite(info?.type)
  const color = () => (authUser[favourites].includes(info.id) ? true : false)
  const [isFav, setIsFav] = useState(authUser ? color : false)

  const handleClickFav = async () => {
    if (authUser === null) {
      handleOpenModal()
    } else {
      setIsFav(!isFav)
      const newUser = await updateFavorite(info, authUser)
      setData(newUser)
    }
  }

  return (
    info && (
      <Box
        sx={{
          bgcolor: isFav ? 'red' : 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '5px',
          height: '100%',
          cursor: 'pointer',
        }}
        onClick={handleClickFav}
      >
        <FavoriteRoundedIcon
          fontSize="medium"
          sx={{ color: isFav ? 'white' : 'grey' }}
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
  )
}

export default FavoriteIcon
