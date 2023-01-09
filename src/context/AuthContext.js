
import React from 'react'
import { BAD_USE_CONTEXT } from '../commons/constants'

const AuthContext = React.createContext()

const AuthProvider = (props) => {
  const values = null
  return <AuthContext.Provider {...props} value={values}/>
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error(`${useAuth.name} ${BAD_USE_CONTEXT} ${AuthProvider.name}`)
  }
  return context
}

export { AuthProvider, useAuth }
