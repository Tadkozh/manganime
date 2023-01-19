import { FAIL, IDLE, LOADING, SUCCESS } from '../commons/constants'

import React from 'react'
import { errorAuth } from '../utils/helper'
import { useCleanupError } from './cleanupError'

const userReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { status: LOADING, data: null }
    case SUCCESS:
      return { status: SUCCESS, data: action.payload }
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
      dispatch({ type: LOADING })

      promise
        .then((data) => {
          dispatch({ type: SUCCESS, payload: data })
        })
        .catch((error) => {
          setError(errorAuth(error))
          dispatch({ type: FAIL })
        })
    },
    [setError],
  )

  const setData = React.useCallback((data) => {
    dispatch({ type: SUCCESS, payload: data })
  }, [])

  const { data, status } = state
  return { data, status, error, setError, execute, setData }
}

export { useUserData }
