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

  const { data: authUser, setData } = useAuth()

  const handleClickFav = async () => {
    if (authUser === null) {
      handleOpenModal()
    } else {
      setIsFav(!isFav)
      const user = await updateFavorite(info, authUser)
      setData(user)
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
          {/* TODO
          Dans le cas des favorites, il faudra aussi intégrer dans la logique le fait de savoir si l’id n’est pas déjà 
          dans son tableau de la DB (favorite_manga ou favorite_anime), pour décider de la couleur de l’icône. 
          Sinon le visiteur ne saura pas s’il ajoute ou supprime un favori, la fonction updateFavorite gérant les deux. */}
        </Typography>
      </Box>
    )
  )
}

export default FavoriteIcon
