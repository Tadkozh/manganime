import { Backdrop, CircularProgress } from '@mui/material'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import React from 'react'
import {
  BAD_USE_CONTEXT,
  DONE,
  FETCHING,
  SIGN_IN,
  SIGN_UP,
} from '../commons/constants'
import { createUser, getUserByUid } from '../database/operations'
import { auth } from '../firebase-config'
import { useUserData } from '../hooks/useUserData'
import { validateForm } from '../utils/helper'

const AuthContext = React.createContext()

const afterAuth = (action, setAction, data) => {
  if (action === SIGN_UP && data != null) {
    createUser(data.user)
    setAction(null)
  }
}

const getUserConnect = async (currentUser) => {
  const user = await getUserByUid(currentUser.uid)
  return user
}
const AuthProviders = (props) => {
  const { data, status, error, setError, setData, execute } = useUserData()

  const retrieveUser = React.useCallback(
    async (currentUser) => {
      if (currentUser) {
        const info = await getUserConnect(currentUser)
        setData(info)
      }
    },
    [setData],
  )

  React.useEffect(() => {
    if (!data) {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          execute(getUserConnect(currentUser))
        }
      })
      return unsubscribe
    }
  }, [data, execute, retrieveUser, setData])

  const register = React.useCallback(async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
  }, [])

  const login = React.useCallback(async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
  }, [])
  const preValidate = React.useCallback(
    (email, password, action = SIGN_IN) => {
      const errorForm = validateForm(email, password)
      if (errorForm) {
        setError(errorForm)
        return
      }
      action === SIGN_IN ? login(email, password) : register(email, password)
      afterAuth(action, data)
    },
    [data, login, register, setError],
  )
  const logout = React.useCallback(() => {
    signOut(auth).then(() => {
      setData(null)
    })
  }, [setData])

  const values = React.useMemo(
    () => ({ data, error, status, logout, preValidate }),
    [data, error, status, logout, preValidate],
  )

  if (status === FETCHING) {
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    )
  }
  if (status === DONE) {
    return <AuthContext.Provider {...props} value={values} />
  }
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error(`${useAuth.name} ${BAD_USE_CONTEXT} ${AuthProviders.name}`)
  }
  return context
}

export { AuthProviders, useAuth }
