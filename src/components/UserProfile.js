import { useAuth } from '../context/AuthContext'

const UserProfile = () => {
  const { data } = useAuth()

  return (
    <>
      <div>Bonjour {data.name}</div>
    </>
  )
}

export { UserProfile }
