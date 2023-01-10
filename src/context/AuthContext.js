import React from 'react'
import {
  USER_NOT_FOUND,
  WRONG_PASSWORD,
  TOO_MANY_REQUEST,
} from '../utils/constants'
import {
  BAD_USE_CONTEXT,
  AUTH_USER_NOT_FOUND,
  AUTH_WRONG_PASSWORD,
  AUTH_TOO_MANY_REQUEST,
} from '../commons/constants'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase-config'
import { validateForm } from '../utils/helper'
import { useCleanupError } from '../hooks/cleanupError'

const AuthContext = React.createContext()

const errorAuth = (error) => {
  let message
  switch (error.code) {
    case AUTH_USER_NOT_FOUND:
      message = USER_NOT_FOUND
      break
    case AUTH_WRONG_PASSWORD:
      message = WRONG_PASSWORD
      break
    case AUTH_TOO_MANY_REQUEST:
      message = TOO_MANY_REQUEST
      break
    default:
      message = error.message
      break
  }
  const newError = {
    code: 400,
    message: message,
  }
  return newError
}

const AuthProviders = (props) => {
  const [data, setData] = React.useState(null)
  const [status, setStatus] = React.useState(false)
  const { clean: error, setClean: setError } = useCleanupError(null)

  const register = React.useCallback(
    (email, password) => {
      const errorForm = validateForm(email, password)
      if (!errorForm) {
        setStatus(true)
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => setData(userCredential.user))
          .catch((err) => {
            setError(err)
          })
        setStatus(false)
      } else {
        setError(errorForm)
      }
    },
    [setError],
  )
  const login = React.useCallback(
    (email, password) => {
      const errorForm = validateForm(email, password)
      if (!errorForm) {
        setStatus(true)
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            setData(userCredential.user)
          })
          .catch((err) => {
            const newError = errorAuth(err)
            setError(newError)
          })
        setStatus(false)
      } else {
        setError(errorForm)
      }
    },
    [setError],
  )
  const logout = () => {
    signOut(auth).then(() => {
      setData(null)
    })
  }

  const values = React.useMemo(
    () => ({ login, logout, register, data, error, status }),
    [data, error, login, register, status],
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
