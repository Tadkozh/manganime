import { useParams } from 'react-router-dom'
import { Box, Button, Grid } from '../ui'

// Constants
import { ANIME } from '../../commons/constants'

// Components
import { useInfos } from '../../hooks/queriesHooks'
import NavBarInfo from '../NavBarInfo'
import InfoDetails from './InfoDetails'
import InfoForm from './InfoForm'
import InfoPresentation from './InfoPresentation'
import InfoReviews from './InfoReviews'
import InfoSynopsis from './InfoSynopsis'

function Infos() {
  let { type, id } = useParams()
  const data = useInfos(type, id)
  const info = data?.Page?.media[0]

  return (
    info && (
      <>
        <NavBarInfo />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
            maxWidth: '100%',
            padding: '10px',
          }}
        >
          <Grid container>
            <GridChild
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                m: '10px auto',
              }}
              children={<InfoPresentation info={info} />}
            />

            <GridChild
              xs={12}
              sm={6}
              md={4}
              sx={{
                order: {
                  md: '-1',
                },
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '500px',
                textAlign: 'justify',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 0 12px -5px #000',
                m: '10px auto',
              }}
              children={<InfoSynopsis synopsis={info.description} />}
            />

            <GridChild
              xs={12}
              sm={12}
              md={4}
              sx={{
                maxHeight: '500px',
                backgroundColor: 'rgba(128, 128, 128, 0.5)',
                padding: '5px 10px',
                overflowY: 'auto',
                m: '10px auto',
              }}
              children={<InfoDetails info={info} />}
            />
          </Grid>

          {type === ANIME && <Trailer info={info.trailer} />}

          <InfoForm info={info} />
          <InfoReviews />
        </Box>
      </>
    )
  )
}

function GridChild({ xs, sm, md, sx, children }) {
  return (
    <Grid item xs={xs} sm={sm} md={md} sx={sx}>
      {children}
    </Grid>
  )
}

function Trailer({ info }) {
  return (
    info && (
      <>
        <Button
          href={`https://www.youtube.com/watch?v=${info.id}`}
          target="_blank"
          rel="noreferrer"
        >
          Watch trailer on {info.site}
        </Button>
        <iframe
          title="Trailer"
          src={`https://www.youtube.com/embed/${info.id}?autoplay=1&mute=1`}
          thumbnail={info.thumbnail}
          style={{
            width: '100%',
            maxWidth: '800px',
            aspectRatio: '3/2',
            margin: '0 auto',
          }}
        />
      </>
    )
  )
}

export default Infos
