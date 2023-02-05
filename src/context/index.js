import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ENV_DEV, THEMES } from '../commons/constants'
import { ColorModeContext } from '../context/ColorModeContext'
import { useStorageColorTheme } from '../hooks/storageColorTheme'
import { changeTheme, getDesignTokens, sameTheme } from '../theme'
import { AuthProviders } from './AuthContext'

const queryClient = new QueryClient({
  defaultOptions: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retryDelay: 500,
    retry: (failureCount, error) => {
      if (error.status === 404) return false
      else if (error.status === 401) return false
      else if (failureCount > 3) return false
      else return true
    },
    mutations: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retryDelay: 500,
      retry: 1,
    },
  },
})

const AppProviders = ({ children }) => {
  const { getColor, setColor } = useStorageColorTheme()
  const [mode, setMode] = React.useState(() => {
    const color = getColor()
    if (color) {
      return color
    } else {
      setColor(THEMES.LIGHT)
      return THEMES.LIGHT
    }
  })
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        let newMode
        setMode((prevMode) => {
          newMode = changeTheme(prevMode)
          return newMode
        })
        setColor(newMode)
      },
    }),
    [setColor],
  )

  const theme = React.useMemo(() => {
    return responsiveFontSizes(createTheme(getDesignTokens(sameTheme(mode))))
  }, [mode])

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <AuthProviders>{children}</AuthProviders>
        </ThemeProvider>
      </ColorModeContext.Provider>

      {process.env.NODE_ENV === ENV_DEV && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

export { AppProviders }
