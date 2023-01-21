import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth'
import React from 'react'
import {
  AUTH_REQUIRE_RECENT_LOGIN,
  BAD_USE_CONTEXT,
  LOADING,
  SIGN_IN,
  SIGN_UP,
  SIGN_UPDATE,
  SUCCESS,
} from '../commons/constants'
import { LoadingScreen } from '../components/ui'
import { createUser, getUserByUid } from '../database/operations'
import { auth } from '../firebase-config'
import { useUserData } from '../hooks/useUserData'
import { errorAuth, validateForm } from '../utils/helper'

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

  const register = React.useCallback(
    async (email, password) => {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      ).catch((err) => setError(errorAuth(err)))
      storeNewUser(user)
    },
    [setError],
  )

  const login = React.useCallback(
    (email, password) => {
      signInWithEmailAndPassword(auth, email, password).catch((err) =>
        setError(errorAuth(err)),
      )
    },
    [setError],
  )
  const logout = React.useCallback(() => {
    signOut(auth).then(() => {
      setData(null)
    })
  }, [setData])

  const validateUpdate = (email, password, user) => {
    const promises = []
    if (email !== user.email) {
      promises.push(updateEmail(user, email))
    }
    if (password) {
      promises.push(updatePassword(user, password))
    }
    return promises
  }

  const updateUserAuth = React.useCallback(
    async (email, password) => {
      const promises = validateUpdate(email, password, auth.currentUser)
      await Promise.all(promises)
        .then(() => {
          // maj user
          // execute(getUserConnect(currentUser))
        })
        .catch((err) => {
          if (err.code === AUTH_REQUIRE_RECENT_LOGIN) {
            logout()
            setTimeout(setError(errorAuth(err)), 100)
          }
        })
    },
    [logout, setError],
  )

  const performAction = React.useCallback(
    (action, email, password) => {
      switch (action) {
        case SIGN_IN:
          login(email, password)
          break
        case SIGN_UP:
          register(email, password)
          break
        case SIGN_UPDATE:
          updateUserAuth(email, password)
          break
        default:
          throw new Error('')
      }
    },
    [login, register, updateUserAuth],
  )

  const preValidate = React.useCallback(
    async (email, password, action = SIGN_IN, isProfile = false) => {
      const errorForm = isProfile
        ? validateForm(email, password, true)
        : validateForm(email, password)
      if (errorForm) {
        setError(errorForm)
        return
      }
      performAction(action, email, password)
      // action === SIGN_IN ? login(email, password) : register(email, password)
    },
    [performAction, setError],
  )

  const values = React.useMemo(
    () => ({ data, error, status, logout, preValidate }),
    [data, error, status, logout, preValidate],
  )

  if (status === LOADING) {
    return <LoadingScreen />
  }
  return (
    <AuthContext.Provider value={values}>
      {status === SUCCESS && children}
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
