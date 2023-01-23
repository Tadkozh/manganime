import { grey, purple, red } from '@mui/material/colors'
import { DARK, LIGHT } from '../commons/constants'

const lightPalette = {
  mode: LIGHT,
  primary: red,
  background: {
    content: '#f44336',
    topIcon: '#EDA41B',
  },
  text: {
    primary: grey[900],
    secondary: grey[800],
  },
}
const darkPalette = {
  mode: DARK,
  primary: purple,
  background: {
    default: '#262626',
    paper: '#262626',
    content: '#262626',
    topIcon: '#EDA41B',
  },
  text: {
    primary: '#fff',
    secondary: grey[500],
  },
}

const palettes = {
  light: lightPalette,
  dark: darkPalette,
}

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === LIGHT ? lightPalette : darkPalette),
  },
})

const changeTheme = (mode) => (mode === LIGHT ? DARK : LIGHT)
const sameTheme = (mode) => (mode === LIGHT ? LIGHT : DARK)

export { getDesignTokens, changeTheme, sameTheme, palettes }
