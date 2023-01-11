import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { data: authUser } = useAuth()
  if (authUser === null) {
    return <Navigate to="/" replace={true} />
  }
  return children
}
export { PrivateRoute }
