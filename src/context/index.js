import { AuthProvider } from './authContext'

const AppProvider = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
}

export { AppProvider }
