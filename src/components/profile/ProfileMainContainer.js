import React from 'react'
import { ANIME, LOADING, MANGA, SUCCESS } from '../../commons/constants'
import { useAuth } from '../../context/AuthContext'
import { useFavorites } from '../../hooks/queriesHooks'
import { getImageName } from '../../utils/helper'
import { ProfileLastUpdateSkeleton } from '../skeletons/ProfileLastUpdateSkeleton'
import {
  blue,
  Box,
  Button,
  Card,
  Divider,
  green,
  grey,
  Grid,
  Link,
  Paper,
  red,
  Typography,
  yellow,
} from '../ui'
import { ProfileBioForm } from './ProfileBioForm'
import { ProfileEdit } from './ProfileEdit'
import { ProfileStats } from './ProfileStats'

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
  const [isDisplayBioForm, setIsDisplayBioForm] = React.useState(false)

  const handleChangeProfile = () => {
    setEditProfile(!editProfile)
  }
  const openFormBio = () => {
    setIsDisplayBioForm(true)
  }
  const closeFormBio = () => {
    setIsDisplayBioForm(false)
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
          <Typography variant="h4">Welcome {user.name}</Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleChangeProfile}
          >
            Change Profile
          </Button>
        </Box>
        {isDisplayBioForm ? (
          <ProfileBioForm closeBio={closeFormBio} user={user} />
        ) : (
          <ProfileBio bio={user.bio} openFormBio={openFormBio} />
        )}
        {editProfile ? <ProfileEdit user={user} /> : <ProfileMainContent />}
      </Paper>
    </Grid>
  )
}
const ProfileBio = ({ bio, openFormBio }) => {
  return !bio ? (
    <Typography variant="body1" sx={{ my: 1, alignSelf: 'flex-start' }}>
      No biography yet.
      <Link sx={{ cursor: 'pointer' }} onClick={() => openFormBio()}>
        Write it now.
      </Link>
    </Typography>
  ) : (
    <Typography variant="body1" sx={{ my: 1, alignSelf: 'flex-start' }}>
      {bio}
      <Link sx={{ cursor: 'pointer', ml: 1 }} onClick={() => openFormBio()}>
        Change Bio
      </Link>
    </Typography>
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
  if (array.length > 3) {
    return array.slice(array.length - 3)
  }
  return array
}

const Stats = ({ stats, type }) => {
  return (
    <Grid item xs={12} md={6}>
      <ProfileStats type={type} stats={stats} />
    </Grid>
  )
}

const LastUpdate = ({ type, lastest }) => {
  const { data: items, status } = useFavorites(type, lastest)
  if (status === LOADING) {
    return <ProfileLastUpdateSkeleton />
  }
  if (status === SUCCESS) {
    return (
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Last {type} Updates</Typography>

        {items.length === 0 ? (
          <>
            <Typography variant="body1" sx={{ m: 1 }}>
              No favourites.
            </Typography>
            <Typography variant="body1" sx={{ m: 1 }}>
              Add favourites to see them here.
            </Typography>
          </>
        ) : (
          items.map((item, key) => (
            <Card sx={{ display: 'flex', flexDirection: 'column', m: 1, p: 1 }}>
              <PosterImage data={item} key={key} />
            </Card>
          ))
        )}
      </Grid>
    )
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
        src={data.coverImage.medium}
        alt={getImageName(data.coverImage.medium)}
        height={'75px'}
      />
      <Typography variant="body1" sx={{ m: 1 }}>
        {data?.title.romaji}
      </Typography>
    </Box>
  )
}

export { ProfileMainContainer }
