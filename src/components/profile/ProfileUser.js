import { useAuth } from '../../context/AuthContext'
import { Grid } from '../ui'
import { ProfileMainContainer } from './ProfileMainContainer'
import { ProfileSideBar } from './ProfileSideBar'
import ProfileStatView from './ProfileStatView'

const ProfileUser = ({ isStatNav = false, isStatOn = false }) => {
  const { data } = useAuth()
  return (
    <>
      <Grid container sx={{ p: 2, justifyContent: 'center' }}>
        <ProfileSideBar />
        <ProfileMainContainer user={data} />
      </Grid>
      {isStatNav && !isStatOn ? <ProfileStatView /> : null}
      {isStatNav && isStatOn ? <ProfileStatView isStatOn /> : null}
    </>
  )
}

export default ProfileUser
