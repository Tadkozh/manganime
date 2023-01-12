import { useState } from 'react'

import './App.css'
import { AppProviders } from './context'
import AppConsumer from './AppConsumer'
import MUISwitchMode from './MUISwitchMode'

import { createTheme, ThemeProvider, CssBaseline, Paper } from '@mui/material'
import { orange } from '@mui/material/colors'

function App() {
  const [mode, setMode] = useState(false)

  const theme = createTheme({
    palette: {
      mode: mode ? 'dark' : 'light',
      primary: {
        main: orange[500],
      },
    },
    typography: {
      // fontSize: 14,
      h4: {
        fontSize: 20,
      },
    },
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper>
          <AppProviders>
            <MUISwitchMode mode={mode} onClick={() => setMode(!mode)} />
            <AppConsumer />
          </AppProviders>
        </Paper>
      </ThemeProvider>
    </>
  )
}

export default App
