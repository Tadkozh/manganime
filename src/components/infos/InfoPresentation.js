import { useAuth } from '../../context/AuthContext'
import { Box, Grid } from '../ui'

import InfoGalery from './InfoGalery'
import FavoriteIcon from './FavoriteIcon'
import StatsDropdowns from '../stats/StatsDropdowns'
import Modale from '../Modal'
import React from 'react'

function InfoPresentation({ info }) {
  const { data: authUser, setData: setAuthUser } = useAuth()
  const [open, setOpen] = React.useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleClick = () => {
    if (authUser === null) {
      handleOpenModal()
    }
  }

  return (
    info && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          m: 1,
        }}
      >
        <InfoGalery info={info} />
        <Grid
          container
          sx={{
            width: '230px',
            lineHeight: 1.75,
            my: 1,
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid item xs={9} lg={9} sx={{ pr: 1 }} onClick={handleClick}>
            <StatsDropdowns
              userDatas={authUser}
              contentInfos={info}
              setAuthUser={setAuthUser}
            />
          </Grid>
          {open && (
            <Modale
              open={open}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
            />
          )}
          <Grid item xs={3} lg={3} xl={3}>
            <FavoriteIcon info={info} />
          </Grid>
        </Grid>
      </Box>
    )
  )
}

export default InfoPresentation
