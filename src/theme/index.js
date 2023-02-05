import { grey, purple, red } from '../components/ui'
import { THEMES } from '../commons/constants'

const lightPalette = {
  mode: THEMES.LIGHT,
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
  mode: THEMES.DARK,
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
    ...(mode === THEMES.LIGHT ? lightPalette : darkPalette),
  },
})

const changeTheme = (mode) =>
  mode === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
const sameTheme = (mode) => (mode === THEMES.LIGHT ? THEMES.LIGHT : THEMES.DARK)

export { getDesignTokens, changeTheme, sameTheme, palettes }
