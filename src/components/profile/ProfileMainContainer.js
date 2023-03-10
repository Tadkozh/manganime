import React from 'react'
import { ANIME, INFOS, LOADING, MANGA, SUCCESS } from '../../commons/constants'
import { useAuth } from '../../context/AuthContext'
import { useFavorites } from '../../hooks/queriesHooks'
import { getImageName, getUrl } from '../../utils/helper'
import { ProfileLastUpdateSkeleton } from '../skeletons/ProfileLastUpdateSkeleton'
import { Link as LinkRouter } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from '../ui'
import { ProfileBioForm } from './ProfileBioForm'
import { ProfileEdit } from './ProfileEdit'
import { ProfileStats } from './ProfileStats'

const ProfileMainContainer = ({ user }) => {
  const [editProfile, setEditProfile] = React.useState(false)
  const [isDisplayBioForm, setIsDisplayBioForm] = React.useState(false)

  const handleChangeProfile = () => {
    setEditProfile(!editProfile)
  }
  const handleSaveProfile = () => {
    setEditProfile(false)
  }
  const openFormBio = () => {
    setIsDisplayBioForm(true)
  }
  const closeFormBio = () => {
    setIsDisplayBioForm(false)
  }
  return (
    <Grid item xs={10} md={8} sx={{ p: 1, maxWidth: 'inherit' }}>
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
          <Typography variant="h4">Welcome {user?.name}</Typography>
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
          <ProfileBio bio={user?.bio} openFormBio={openFormBio} />
        )}
        {editProfile ? (
          <ProfileEdit user={user} closeEdit={handleSaveProfile} />
        ) : (
          <ProfileMainContent />
        )}
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
      ? getLastFavorites(user?.favorite_anime)
      : getLastFavorites(user?.favorite_manga)
  return (
    <>
      <Stats stats={user.stats} type={name} />
      <LastFavourites type={name} lastest={lastList} />
    </>
  )
}
const getLastFavorites = (array) => {
  if (array?.length > 3) {
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

const LastFavourites = ({ type, lastest }) => {
  const { data: items, status } = useFavorites(type, lastest)
  if (status === LOADING) {
    return <ProfileLastUpdateSkeleton />
  }
  if (status === SUCCESS) {
    return (
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Last {type} Favourites</Typography>

        {items?.length === 0 ? (
          <>
            <Typography variant="body1" sx={{ m: 1 }}>
              No favourites.
            </Typography>
            <Typography variant="body1" sx={{ m: 1 }}>
              Add favourites to see them here.
            </Typography>
          </>
        ) : (
          items?.map((item, key) => (
            <LinkRouter
              key={key + item.id}
              to={getUrl([type, INFOS, item?.id])}
              style={{ textDecoration: 'none' }}
            >
              <Card
                sx={{ display: 'flex', flexDirection: 'column', m: 1, p: 1 }}
                key={key + getImageName(item?.coverImage.medium)}
              >
                <PosterImage data={item} key={key} />
              </Card>
            </LinkRouter>
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
