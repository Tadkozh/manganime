import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate()
  const { data: authUser } = useAuth()
  if (authUser != null && authUser !== undefined) {
    navigate('/')
  }
  return children
}
export { PrivateRoute }
