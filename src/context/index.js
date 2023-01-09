import { AuthProvider } from './AuthContext'

const AppProvider = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
}

export { AppProvider }
