import { useAuth } from '../../context/AuthContext'
import { Grid } from '../ui'
import { ProfileMainContainer } from './ProfileMainContainer'
import { ProfileSideBar } from './ProfileSideBar'

const ProfileUser = () => {
  const { data } = useAuth()
  return (
    <Grid container sx={{ p: 2, justifyContent: 'center' }}>
      <ProfileSideBar />
      <ProfileMainContainer user={data} />
    </Grid>
  )
}

export default ProfileUser
