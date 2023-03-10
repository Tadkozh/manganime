import React from 'react'
import {
  ANIME,
  FINISHED,
  FORMAT,
  ISADULT,
  MANGA_SCH,
  PER_PAGE,
  POPULARITY,
  RESET,
  SCORE,
  SEARCH,
  SORT,
  STATUS,
  TRENDING_DESC,
  TV,
} from '../commons/constants'

const searchParamsReducer = (state, action) => {
  switch (action.type) {
    case SEARCH:
      return { ...state, search: action.payload }
    case FORMAT:
      return { ...state, format: action.payload }
    case STATUS:
      return { ...state, status: action.payload }
    case SCORE:
      return { ...state, score: action.payload }
    case POPULARITY:
      return { ...state, popularity: action.payload }
    case SORT:
      return { ...state, sortBy: action.payload }
    case ISADULT:
      return { ...state, isAdult: !state.isAdult }
    case PER_PAGE:
      return { ...state, perPage: action.payload }
    case RESET:
      return {
        search: null,
        format: action.payload,
        status: FINISHED,
        score: 0,
        popularity: 0,
        sortBy: TRENDING_DESC,
        isAdult: false,
        perPage: 30,
      }
    default:
      throw new Error(`Error from ${searchParamsReducer.name}`)
  }
}

const useSearchFieldsParams = (type) => {
  const formatValue = type === ANIME ? TV : MANGA_SCH
  const [state, dispatch] = React.useReducer(searchParamsReducer, {
    search: null,
    format: formatValue,
    status: FINISHED,
    score: 0,
    popularity: 0,
    sortBy: TRENDING_DESC,
    isAdult: false,
    perPage: 30,
  })

  const setValue = (type, value = null) => {
    dispatch({ type: type, payload: value })
  }

  const resetFields = () => {
    dispatch({ type: RESET, payload: formatValue })
  }

  return { setValue, resetFields, state }
}

export { useSearchFieldsParams }
