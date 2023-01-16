import { Card, Divider, Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import profilePicture from '../assets/images/avatar_1.jpg'
import { useAuth } from '../context/AuthContext'
import { Button, Typography } from './index'

const UserProfile = () => {
  const { data } = useAuth()
  return (
    <Grid container spacing={1} sx={{ my: 2, py: 2, justifyContent: 'center' }}>
      <SideBarUserInfo />
      <MainUserInfo />
    </Grid>
  )
}
const MainUserInfo = () => {
  return (
    <Grid item xs md sx={{ m: 1 }}>
      <Container>
        <Typography variant="h6">Bios</Typography>
        <Typography variant="body1">No biography yet. Write it now.</Typography>
      </Container>
      <Typography variant="h6">Statistic</Typography>
      <Divider />
      <Container>
        <div className="animestats">
          <ul>
            <li></li>
          </ul>
        </div>
        <div className="lastanimeupdate"></div>
      </Container>
    </Grid>
  )
}

const SideBarUserInfo = () => {
  return (
    <Card sx={{ mx: 'auto' }}>
      <Grid item xs md={'auto'} sx={{ m: 1 }}>
        <Box sx={{ m: 2 }}>
          <img
            width={225}
            height={225}
            alt={'profile img'}
            src={profilePicture}
          />
        </Box>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            my: 1,
            mx: 'auto',
            justifyContent: 'center',
          }}
        >
          <Button>AnimeList</Button>
          <Button>MangaList</Button>
        </Container>
        <Divider />
        <Statistics />
      </Grid>
    </Card>
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

const Stat = ({ name, number }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="body1">{name}</Typography>
      <Typography variant="body1">{number}</Typography>
    </Container>
  )
}

export { UserProfile }
