import { deepPurple, grey, red, purple } from '@mui/material/colors'
import { DARK, LIGHT } from '../commons/constants'

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === LIGHT
      ? {
          // palette values for light mode
          primary: red,
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: purple,
          background: {
            default: deepPurple[900],
            paper: deepPurple[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
})

const changeTheme = (mode) => (mode === LIGHT ? DARK : LIGHT)
const sameTheme = (mode) => (mode === LIGHT ? LIGHT : DARK)

export { getDesignTokens, changeTheme, sameTheme }
