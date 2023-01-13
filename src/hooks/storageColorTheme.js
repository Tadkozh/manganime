import React from 'react'
import { THEME_COLOR_LOCAL_STORAGE } from '../commons/constants'

const useStorageColorTheme = () => {
  const setColor = React.useCallback((theme) => {
    window.localStorage.setItem(THEME_COLOR_LOCAL_STORAGE, theme)
  }, [])

  const getColor = React.useCallback(() => {
    const result = window.localStorage.getItem(THEME_COLOR_LOCAL_STORAGE)
    return result
  }, [])

  return { setColor, getColor }
}

export { useStorageColorTheme }

