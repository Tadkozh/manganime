import React from 'react'
import { DONE, FAIL, FETCHING, IDLE } from '../commons/constants'
import { errorAuth } from '../utils/helper'
import { useCleanupError } from './cleanupError'

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

