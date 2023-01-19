import { Box, CardActions, CardContent, Paper } from '@mui/material'
import { blue, green, grey, red, yellow } from '@mui/material/colors'
import profilePicture from '../../assets/images/avatar_1.jpg'
import { ANIME, MANGA } from '../../commons/constants'
import { useAuth } from '../../context/AuthContext'
import { useInfos } from '../../hooks/queriesHooks'
import { getImageName } from '../../utils/helper'
import { Button, Card, Container, Divider, Grid, Typography } from '../ui'
import { ProfileStats, Stat } from './ProfileStats'

const stats = [
  {
    name: 'Watching',
    number: 5,
    color: green[500],
  },
  {
    name: 'Completed',
    number: 10,
    color: blue[500],
  },
  {
    name: 'On-hold',
    number: 2,
    color: yellow[500],
  },
  {
    name: 'Dropped',
    number: 1,
    color: red[500],
  },
  {
    name: 'Plan to Watch',
    number: 23,
    color: grey[500],
  },
]

const lastAnime = [41467, 376, 11061]
const lastManga = [2, 7, 21]

const ProfileUser = () => {
  const { data } = useAuth()
  return (
    <Grid container sx={{ p: 2, justifyContent: 'center' }} md={12}>
      <ProfileSideBar />
      <MainUserInfo user={data.name} />
    </Grid>
  )
}
const MainUserInfo = ({ user }) => {
  return (
    <Grid item xs={10} md={8}>
      <Paper
        sx={{
          with: '100%',
          m: 1,
          p: 2,
        }}
        xs={7}
        elevation={5}
      >
        <Typography variant="h4" sx={{ my: 2 }}>
          Bios, welcome {user}
        </Typography>
        <Typography variant="body1" sx={{ my: 1 }}>
          No biography yet. Write it now.
        </Typography>
        <StatisticsGlobal />
      </Paper>
    </Grid>
  )
}

const StatisticsGlobal = () => {
  return (
    <>
      <Typography variant="h6">Statistic</Typography>
      <Grid xs={10} md={12}>
        <Divider />
        <AllAnimeStats />
        <AllMangaStats />
      </Grid>
    </>
  )
}

const AllAnimeStats = () => {
  return (
    <Container
      sx={{
        display: 'flex',
      }}
    >
      <StatsAnime stats={stats} />
      <LastAnimeUpdate />
    </Container>
  )
}
const AllMangaStats = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between',
      }}
    >
      <StatsManga stats={stats} />
      <LastMangaUpdate />
    </Container>
  )
}

const ProfileSideBar = () => {
  return (
    <Grid item xs={7} md={4} lg={2.75}>
      <Card
        sx={{
          with: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          m: 1,
          py: 1,
        }}
      >
        <ProfileImage image={profilePicture} />
        <ProfileListButtons />
        <Divider />
        <Statistics />
      </Card>
    </Grid>
  )
}

const ProfileImage = ({ image }) => {
  return (
    <CardContent sx={{ mx: 'auto' }}>
      <img width={225} height={225} alt={'profile img'} src={image} />
    </CardContent>
  )
}
const ProfileListButtons = () => {
  return (
    <CardActions
      sx={{
        display: 'flex',
        flexDirection: 'row',
        my: 1,
        mx: 'auto',
        justifyContent: 'center',
      }}
    >
      <Button variant="contained" color="primary">
        AnimeList
      </Button>
      <Button variant="outlined" color="primary">
        MangaList
      </Button>
    </CardActions>
  )
}

const StatsAnime = ({ stats }) => {
  return (
    <Grid item xs={10} md={6}>
      <ProfileStats type={ANIME} stats={stats} />
    </Grid>
  )
}
const StatsManga = ({ stats }) => {
  return (
    <Grid item xs={10} md={6}>
      <ProfileStats type={MANGA} stats={stats} />
    </Grid>
  )
}
const LastAnimeUpdate = () => {
  return <LastUpdate type={ANIME} lastest={lastAnime} />
}
const LastMangaUpdate = () => {
  return <LastUpdate type={MANGA} lastest={lastManga} />
}

const LastUpdate = ({ type, lastest }) => {
  return (
    <Grid item xs={10} md={7}>
      <Typography variant="h6">Last {type} Updates</Typography>
      <Card sx={{ display: 'flex', flexDirection: 'column', m: 1, p: 1 }}>
        {lastest.map((item, key) => (
          <ImageLast type={type} id={item} key={key + type} />
        ))}
      </Card>
    </Grid>
  )
}
const ImageLast = ({ type, id }) => {
  const data = useInfos(type, id)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        m: 1,
        alignItems: 'center',
      }}
    >
      <img
        src={`${data?.images.jpg.image_url}`}
        alt={data ? getImageName(data?.images.jpg.image_url) : 'image latest'}
        height={'75px'}
      />
      <Typography variant="body1" sx={{ m: 1 }}>
        {data?.title}
      </Typography>
    </Box>
  )
}

const Statistics = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="body1" sx={{ my: 2 }}>
        Statistics
      </Typography>
      <Stat name={'Reviews'} number={0} />
      <Stat name={'Recommendation'} number={0} />
      <Stat name={'Comments'} number={0} />
    </Container>
  )
}

export { ProfileUser }
