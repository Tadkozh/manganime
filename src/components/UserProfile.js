import { useAuth } from '../context/AuthContext'
import { MangAnimeAppBar } from './MangAnimeAppBar'

const UserProfile = () => {
  const { data } = useAuth()

  return (
    <>
      <MangAnimeAppBar />
      <div>Bonjour {data.name}</div>
    </>
  )
}

export { UserProfile }
