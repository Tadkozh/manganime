import React from 'react'
import { Link } from 'react-router-dom'
import profilePicture from '../../assets/images/avatar_1.jpg'
import { IDLE, LOADING, PROFILE, SUCCESS } from '../../commons/constants'
import { useAuth } from '../../context/AuthContext'
import { userPicture } from '../../database/user'
import { getUrl } from '../../utils/helper'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Edit,
  Grid,
  Skeleton,
} from '../ui'

const ProfileSideBar = () => {
  return (
    <Grid item xs={7} md={4} lg={2.75} sx={{ maxWidth: 'none' }}>
      <Card
        sx={{
          with: '100%',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          m: 1,
          py: 1,
        }}
      >
        <ProfileSideBarImage />
        <ProfileSideBarListButtons />
      </Card>
    </Grid>
  )
}
const ProfileSideBarImage = () => {
  const { data: user, setData, status } = useAuth()

  const handleUpload = async (e) => {
    if (e.target.files.length > 0) {
      const newUser = await userPicture(e.target.files[0], user)
      setData(newUser)
    }
  }

  return (
    <CardContent
      sx={{
        mx: 'auto',
        p: 0,
        position: 'relative',
        lineHeight: 0,
        maxHeight: '225px',
        overflowY: 'hidden',
      }}
    >
      {status === LOADING && (
        <Skeleton sx={{ width: '225px', height: '225px' }} />
      )}
      {status === SUCCESS || status === IDLE ? (
        <img
          width={225}
          alt={'profile img'}
          src={user?.picture_url ? user?.picture_url : profilePicture}
          style={{ backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
          loading="lazy"
        />
      ) : null}
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
        <Button variant="text" component="label" sx={{ minWidth: 0 }}>
          <Edit />
          <input
            hidden
            accept="image/*"
            type={'file'}
            onChange={handleUpload}
          />
        </Button>
      </Box>
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
        <Link
          to={getUrl([PROFILE, 'anime'])}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          AnimeList
        </Link>
      </Button>
      <Button variant="outlined" color="primary">
        <Link
          to={getUrl([PROFILE, 'manga'])}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          MangaList
        </Link>
      </Button>
    </CardActions>
  )
}

// const ProfileSideBarStatistics = () => {
//   return (
//     <Container
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       <Typography variant="body1" sx={{ my: 2 }}>
//         Statistics
//       </Typography>
//       <Stat name={'Reviews'} number={0} />
//       <Stat name={'Recommendation'} number={0} />
//       <Stat name={'Comments'} number={0} />
//     </Container>
//   )
// }
export { ProfileSideBar }
