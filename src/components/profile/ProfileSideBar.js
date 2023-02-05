import React from 'react'
import { Link } from 'react-router-dom'
import profilePicture from '../../assets/images/avatar_1.jpg'
import { PROFILE } from '../../commons/constants'
import { useAuth } from '../../context/AuthContext'
import { userPicture } from '../../database/user'
import { useLoadImage } from '../../hooks/loadImage'
import { getUrl } from '../../utils/helper'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Edit,
  Grid,
  Skeleton,
  Typography
} from '../ui'
import { Stat } from './Stat'

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
        <Divider />
        <ProfileSideBarStatistics />
      </Card>
    </Grid>
  )
}
const ProfileSideBarImage = () => {
  const { data: user, setData } = useAuth()
  const { isLoading, image } = useLoadImage(user)

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
      {isLoading || (image === null && !user?.picture) ? (
        <Skeleton sx={{ width: '225px', height: '225px' }} />
      ) : (
        <img
          width={225}
          alt={'profile img'}
          src={user?.picture ? image : profilePicture}
          style={{ backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
          loading="lazy"
        />
      )}
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

