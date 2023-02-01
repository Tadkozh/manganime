import { Navigate, Outlet } from 'react-router-dom'
import { ROUTE_LOGIN_REGISTER } from '../commons/constants'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = () => {
  const { authUser: data } = useAuth()
  if (!data) {
    return <Navigate to={ROUTE_LOGIN_REGISTER} />
  }
  return <Outlet />
}

export { PrivateRoute }
