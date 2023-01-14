import { deepPurple, grey, red, purple } from '@mui/material/colors'
import { DARK, LIGHT } from '../commons/constants'

const lightPalette = {
  mode: LIGHT,
  primary: red,
  text: {
    primary: grey[900],
    secondary: grey[800],
  },
}
const darkPalette = {
  mode: DARK,
  primary: purple,
  background: {
    default: deepPurple[900],
    paper: deepPurple[900],
  },
  text: {
    primary: '#fff',
    secondary: grey[500],
  },
}

const palettes = {
  dark: darkPalette,
  light: lightPalette,
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
