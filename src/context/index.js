import { AuthProviders } from './AuthContext'

const AppProviders = ({ children }) => {
  return <AuthProviders>{children}</AuthProviders>
}

export { AppProviders }
