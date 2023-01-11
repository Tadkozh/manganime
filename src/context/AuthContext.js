import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import React from 'react'
import { BAD_USE_CONTEXT, SIGN_IN } from '../commons/constants'
import { auth } from '../firebase-config'
import { useUserData } from '../hooks/useUserData'
import { validateForm } from '../utils/helper'

const AuthContext = React.createContext()

const AuthProviders = (props) => {
  const { data, status, error, setError, execute, setData } = useUserData()

  const register = React.useCallback(
    (email, password) => {
      setPersistence(auth, browserSessionPersistence).then(() => {
        execute(createUserWithEmailAndPassword(auth, email, password))
      })
    },
    [execute],
  )
  const login = React.useCallback(
    (email, password) => {
      setPersistence(auth, browserSessionPersistence).then(() => {
        execute(signInWithEmailAndPassword(auth, email, password))
      })
    },
    [execute],
  )
  const preValidate = React.useCallback(
    (email, password, action = SIGN_IN) => {
      const errorForm = validateForm(email, password)
      if (errorForm) {
        setError(errorForm)
        return
      }
      action === SIGN_IN ? login(email, password) : register(email, password)
    },
    [login, register, setError],
  )
  const logout = React.useCallback(() => {
    signOut(auth).then(() => {
      setData(null)
    })
  }, [setData])

  const values = React.useMemo(
    () => ({ preValidate, logout, data, error, status }),
    [data, error, logout, preValidate, status],
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
