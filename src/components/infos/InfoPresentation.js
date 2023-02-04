import { useAuth } from '../../context/AuthContext'
import { Box, Grid } from '../ui'

import InfoGalery from './InfoGalery'
import FavoriteIcon from './FavoriteIcon'
import StatsDropdowns from '../stats/StatsDropdowns'

function InfoPresentation({ info }) {
  const { data: authUser, setData: setAuthUser } = useAuth()

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
          {authUser && (
            <Grid item xs={9} lg={9} sx={{ pr: 1 }}>
              <StatsDropdowns
                userDatas={authUser}
                contentInfos={info}
                setAuthUser={setAuthUser}
              />
            </Grid>
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
