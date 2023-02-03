import { useAuth } from '../../context/AuthContext'
import { Box, Button, Typography } from '../ui'

import FavoriteIcon from './FavoriteIcon'
import InfoGalery from './InfoGalery'
import { GlobalRating } from './RatingInfos'
import StatsDropdowns from '../stats/StatsDropdowns'

function InfoPresentation({ info }) {
  const { data: authUser, setData: setAuthUser } = useAuth()

  return (
    info && (
      <>
        <Typography
          component="h2"
          variant="h3"
          sx={{ textAlign: 'center', m: '0 auto' }}
        >
          {info.title.romaji ?? info.title.english}
        </Typography>
        <Typography>{info.title.native}</Typography>

        <InfoGalery info={info} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            // alignItems: 'end',
            gap: '10px',
            mt: '10px',
            border: 'solid',
          }}
        >
          <FavoriteIcon info={info} />
          <Box>
            <GlobalRating info={info} />
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
          {authUser ? (
            <Box>
              <StatsDropdowns
                userDatas={authUser}
                contentInfos={info}
                setAuthUser={setAuthUser}
              />
            </Box>
          ) : null}
        </Box>
      </>
    )
  )
}

export default InfoPresentation
