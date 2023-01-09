import React from 'react'
import { BAD_USE_CONTEXT } from '../commons/constants'
import { validateForm } from '../utils/helper'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase-config'

const AuthContext = React.createContext()

const AuthProviders = (props) => {
  const [data, setData] = React.useState({})
  const [error, setError] = React.useState(null)

  const register = (email, password) => {
    const errorForm = validateForm(email, password)
    if (!errorForm) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => setData(userCredential.user))
        .catch((err) => {
          setError(err)
        })
    } else {
      setError(errorForm)
    }
  }
  const login = (email, password) => {
    const errorForm = validateForm(email, password)
    if (!errorForm) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => setData(userCredential.user))
        .catch((err) => {
          setError(err)
        })
    } else {
      setError(errorForm)
    }
  }
  const logout = () => {
    signOut(auth).then(() => {
      setData(null)
    })
  }

  const values = React.useMemo(
    () => ({ login, logout, register, data, error }),
    [data, error],
  )
  return <AuthContext.Provider {...props} value={values} />
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error(`${useAuth.name} ${BAD_USE_CONTEXT} ${AuthProviders.name}`)
  }
  return context
}

export { AuthProviders, useAuth }
