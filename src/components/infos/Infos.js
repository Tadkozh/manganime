import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useInfos } from '../../hooks/queriesHooks'

import { Box, Button, Grid, Typography } from '../ui'

// Constants
import { ANIME } from '../../commons/constants'

// Components
import NavBarInfo from '../NavBarInfo'
import InfoPresentation from './InfoPresentation'
import { GlobalRating } from './RatingInfos'
import InfoSynopsis from './InfoSynopsis'
import InfoDetails from './InfoDetails'
import FormOrReview from './FormOrReview'
import InfoForm from './InfoForm'
import InfoReviews from './InfoReviews'

function Infos() {
  const { data: authUser } = useAuth()

  let { type, id } = useParams()
  const data = useInfos(type, id)
  const info = data?.Page?.media[0]

  const isBanner = info?.bannerImage ? true : false

  return (
    info && (
      <>
        <NavBarInfo />
        <Box
          component={isBanner ? 'img' : 'div'}
          src={info?.bannerImage}
          sx={{
            display: { xs: 'none', md: isBanner ? 'block' : 'none' },
            width: '100%',
            height: { md: '200px', lg: '400px' },
            objectFit: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        <Box sx={{ display: { md: 'none' }, textAlign: 'center' }}>
          <Typography component="h2" variant="h3" sx={{ mt: 2, mx: 'auto' }}>
            {info?.title?.romaji ?? info?.title?.english}
          </Typography>
          <GlobalRating info={info} />
        </Box>

        <Grid
          container
          sx={{
            p: 1,
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            xl={3}
            sx={{
              my: '0',
              mt: { md: isBanner ? '-5%' : 1 },
            }}
          >
            <InfoPresentation info={info} />
            <InfoDetails info={info} />
          </Grid>

          <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
            <Box sx={{ display: { xs: 'none', md: 'block' }, ml: { md: 2 } }}>
              <Typography component="h2" variant="h3" sx={{ my: 2 }}>
                {info?.title?.romaji ?? info?.title?.english}
              </Typography>
              <GlobalRating info={info} />
            </Box>

            <InfoSynopsis info={info} />

            {type === ANIME && <Trailer info={info?.trailer} />}

            {authUser ? (
              <FormOrReview info={info} user={authUser} />
            ) : (
              <InfoForm />
            )}

            <InfoReviews />
          </Grid>
        </Grid>
      </>
    )
  )
}

function Trailer({ info }) {
  return (
    info && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
        }}
      >
        <iframe
          title="Trailer"
          src={`https://www.youtube.com/embed/${info.id}`}
          thumbnail={info.thumbnail}
          style={{
            width: '100%',
            maxWidth: '800px',
            aspectRatio: '3/2',
            margin: '0 auto',
          }}
        />
        <Button
          variant="outlined"
          size="small"
          href={`https://www.youtube.com/watch?v=${info.id}`}
          target="_blank"
          rel="noreferrer"
          sx={{ width: 'fit-content', m: 2, p: 1 }}
        >
          Watch trailer on {info.site}
        </Button>
      </Box>
    )
  )
}

export default Infos
