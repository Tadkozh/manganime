import React from 'react'
import { ANIME, LOADING, MANGA, SUCCESS } from '../../commons/constants'
import { useInfos } from '../../hooks/queriesHooks'
import { getImageName } from '../../utils/helper'
import { PosterImageSkeleton } from '../skeletons/PosterImageSkeleton'
import {
  blue,
  Box,
  Button,
  Card,
  Divider,
  green,
  grey,
  Grid,
  Paper,
  red,
  Typography,
  yellow,
} from '../ui'
import { ProfileEdit } from './ProfileEdit'
import { ProfileStats } from './ProfileStats'
import { useAuth } from '../../context/AuthContext'

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

const ProfileMainContainer = ({ user }) => {
  const [editProfile, setEditProfile] = React.useState(false)

  const handleChangeProfile = () => {
    setEditProfile(!editProfile)
  }
  return (
    <Grid item xs={10} md={8} sx={{ p: 1 }}>
      <Paper
        sx={{
          with: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
        }}
        xs={7}
        elevation={5}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4">Bios, welcome {user.name}</Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleChangeProfile}
          >
            Change Profile
          </Button>
        </Box>
        <Typography variant="body1" sx={{ my: 1, alignSelf: 'flex-start' }}>
          No biography yet. Write it now.
        </Typography>
        {!editProfile ? <ProfileEdit user={user} /> : <ProfileMainContent />}
      </Paper>
    </Grid>
  )
}

const ProfileMainContent = () => {
  return (
    <>
      <Typography variant="h6" sx={{ my: 1, alignSelf: 'flex-start' }}>
        Statistic
      </Typography>
      <Divider />
      <ProfileMainStatistics />
    </>
  )
}
const ProfileMainStatistics = () => {
  return (
    <Grid container spacing={1}>
      <ProfileMainType name={ANIME} />
      <ProfileMainType name={MANGA} />
    </Grid>
  )
}
const ProfileMainType = ({ name }) => {
  const { data: user } = useAuth()
  const lastList =
    name === ANIME
      ? getLastFavorites(user.favorite_anime)
      : getLastFavorites(user.favorite_manga)
  return (
    <>
      <Stats stats={stats} type={name} />
      <LastUpdate type={name} lastest={lastList} />
    </>
  )
}
const getLastFavorites = (array) => {
  return array.slice(array.length - 3)
}

const Stats = ({ stats, type }) => {
  return (
    <Grid item xs={12} md={6}>
      <ProfileStats type={type} stats={stats} />
    </Grid>
  )
}

const LastUpdate = ({ type, lastest }) => {
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6">Last {type} Updates</Typography>
      <Card sx={{ display: 'flex', flexDirection: 'column', m: 1, p: 1 }}>
        {lastest.map((item, key) => (
          <ImageLastUpdate type={type} id={item} key={key + type} />
        ))}
      </Card>
    </Grid>
  )
}

const ImageLastUpdate = ({ type, id }) => {
  const { data, status } = useInfos(type, id)

  if (status === LOADING) {
    return <PosterImageSkeleton />
  }

  if (status === SUCCESS) {
    return <PosterImage data={data} />
  }
}
const PosterImage = ({ data }) => {
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

export { ProfileMainContainer }
