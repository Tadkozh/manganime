import { Backdrop, CircularProgress } from '@mui/material'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import React from 'react'
import {
  BAD_USE_CONTEXT,
  DONE,
  FETCHING,
  SIGN_IN
} from '../commons/constants'
import { createUser, getUserByUid } from '../database/operations'
import { auth } from '../firebase-config'
import { useUserData } from '../hooks/useUserData'
import { validateForm } from '../utils/helper'

const AuthContext = React.createContext()

const storeNewUser = (data) => {
  if (data != null) {
    createUser(data.user)
  }
}

const getUserConnect = async (currentUser) => {
  const user = await getUserByUid(currentUser.uid)
  return user
}
const AuthProviders = ({ children }) => {
  const { data, status, error, setError, setData, execute } = useUserData()

  // Check if user is already connected
  React.useEffect(() => {
    if (!data) {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          execute(getUserConnect(currentUser))
        } else {
          setData(null)
        }
      })
      return unsubscribe
    }
  }, [data, execute, setData])

  const register = React.useCallback(async (email, password) => {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    storeNewUser(user)
  }, [])

  const login = React.useCallback((email, password) => {
    signInWithEmailAndPassword(auth, email, password)
  }, [])
  const preValidate = React.useCallback(
    async (email, password, action = SIGN_IN) => {
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
  return (
    <AuthContext.Provider value={values}>
      {status === DONE && children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error(`${useAuth.name} ${BAD_USE_CONTEXT} ${AuthProviders.name}`)
  }
  return context
}

export { AuthProviders, useAuth }

