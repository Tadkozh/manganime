import { useAuth } from '../context/AuthContext'
import { redirect } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { data: authUser } = useAuth()
  if (authUser != null && authUser !== undefined) {
    redirect('/')
  }
  return children
}
export { PrivateRoute }
