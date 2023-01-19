import profilePicture from '../../assets/images/avatar_1.jpg'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from '../ui'
import { Stat } from './Stat'

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
        <ProfileSideBarImage image={profilePicture} />
        <ProfileSideBarListButtons />
        <Divider />
        <ProfileSideBarStatistics />
      </Card>
    </Grid>
  )
}
const ProfileSideBarImage = ({ image }) => {
  return (
    <CardContent sx={{ mx: 'auto' }}>
      <img width={225} height={225} alt={'profile img'} src={image} />
    </CardContent>
  )
}
const ProfileSideBarListButtons = () => {
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

const ProfileSideBarStatistics = () => {
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
export { ProfileSideBar }
