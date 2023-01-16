import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = () => {
  const { data } = useAuth()
  if (!data) {
    return <Navigate to="/" />
  }
  return <Outlet />
}

export { PrivateRoute }
