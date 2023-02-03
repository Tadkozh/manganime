import { useAuth } from '../../context/AuthContext'
import { Box, Grid } from '../ui'

import StatsDropdowns from '../stats/StatsDropdowns'
import FavoriteIcon from './FavoriteIcon'
import InfoGalery from './InfoGalery'
import { GlobalRating } from './RatingInfos'

function InfoPresentation({ info }) {
  const { data: authUser, setData: setAuthUser } = useAuth()

  return info ? (
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
          mt: '15px',
          width: '230px',
          lineHeight: 1.75,
        }}
      >
        <Grid item xs={9} lg={9} sx={{ pr: 1 }}>
          {authUser ? (
            <StatsDropdowns
              userDatas={authUser}
              contentInfos={info}
              setAuthUser={setAuthUser}
            />
          ) : null}
        </Grid>
        <Grid item xs={3} lg={3} xl={3}>
          <FavoriteIcon info={info} />
        </Grid>
      </Grid>
      <GlobalRating info={info} />
    </Box>
  ) : null
}
export default InfoPresentation
