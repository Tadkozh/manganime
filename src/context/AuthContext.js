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
  SIGN,
  SUCCESS,
} from '../commons/constants'
import { LoadingScreen } from '../components/ui'
import {
  getUserbyUid,
  storeUser,
  updateProfileUser,
  updateUserCurrent,
} from '../database/user'
import { auth } from '../firebase-config'
import { useUserData } from '../hooks/useUserData'
import {
  errorAuth,
  validationProfileForm,
  validationSignForm,
} from '../utils/helper'

const AuthContext = React.createContext()

const AuthProviders = ({ children }) => {
  const { data, status, error, setError, setData, execute } = useUserData()

  // Check if user is already connected
  React.useEffect(() => {
    if (!data) {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          execute(getUserbyUid())
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
      storeUser(user)
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

  const updateUserAuth = React.useCallback(
    async (user) => {
      const promises = validationUpdateAuth(
        user.email,
        user.password,
        auth.currentUser,
      )
      await Promise.all(promises)
        .then(async () => {
          await updateUserCurrent(user)
          execute(getUserbyUid())
        })
        .catch((err) => {
          if (err.code === AUTH_REQUIRE_RECENT_LOGIN) {
            logout()
            setTimeout(setError(errorAuth(err)), 200)
          }
        })
    },
    [execute, logout, setError],
  )

  const validationUpdateAuth = (email, password, user) => {
    const promises = []
    if (email !== user.email) {
      promises.push(updateEmail(user, email))
    }
    if (password) {
      promises.push(updatePassword(user, password))
    }
    return promises
  }

  const validationProfile = React.useCallback(
    (userToUpdate, userCurrent) => {
      const errorForm = validationProfileForm(userToUpdate)
      if (errorForm) {
        setError(errorForm)
        return
      }
      const newUser = updateProfileUser(userToUpdate, userCurrent)
      updateUserAuth(newUser)
    },
    [setError, updateUserAuth],
  )

  const validationSign = React.useCallback(
    (email, password, action = SIGN.IN) => {
      const errorForm = validationSignForm(email, password)
      if (errorForm) {
        setError(errorForm)
        return
      }
      action === SIGN.IN ? login(email, password) : register(email, password)
    },
    [login, register, setError],
  )

  const values = React.useMemo(
    () => ({
      data,
      error,
      status,
      logout,
      validationSign,
      validationProfile,
      execute,
    }),
    [data, error, status, execute, logout, validationSign, validationProfile],
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
