import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

import { FavoriteRoundedIcon, Paper } from '../ui'

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
      <>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '5px',
            height: '100%',
            cursor: 'pointer',
          }}
          elevation={2}
          onClick={handleClickFav}
        >
          <FavoriteRoundedIcon
            fontSize="medium"
            sx={{ color: isFav ? 'red' : 'grey' }}
          />
        </Paper>
        {open && (
          <Modale
            open={open}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        )}
      </>
    )
  )
}

export default FavoriteIcon
