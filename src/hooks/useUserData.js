import React from 'react'
import {
  AUTH_TOO_MANY_REQUEST, AUTH_USER_NOT_FOUND,
  AUTH_WRONG_PASSWORD, DONE, FAIL, FETCHING, IDLE
} from '../commons/constants'
import {
  TOO_MANY_REQUEST, USER_NOT_FOUND,
  WRONG_PASSWORD
} from '../utils/constants'
import { useCleanupError } from './cleanupError'


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

const userReducer = (state, action) => {
  switch (action.type) {
    case FETCHING:
      return { status: FETCHING, data: null }
    case DONE:
      return { status: DONE, data: action.payload }
    case FAIL:
      return { status: FAIL, data: null }
    default:
      throw new Error(`Erreur sur le 'reducer ${userReducer.name}`)
  }
}
const useUserData = () => {
  const { clean: error, setClean: setError } = useCleanupError()
  const [state, dispatch] = React.useReducer(userReducer, {
    data: null,
    status: IDLE,
  })

  const execute = React.useCallback(
    (promise) => {
      dispatch({ type: FETCHING })

      promise
        .then((data) => {
          dispatch({ type: DONE, payload: data })
        })
        .catch((error) => {
          setError(errorAuth(error))
          dispatch({ type: FAIL })
        })
    },
    [setError],
  )

  const setData = () => {
    dispatch({ type: DONE, payload: data })
  }

  const { data, status } = state

  return { data, status, error, setError, execute, setData }
}

export { useUserData }

