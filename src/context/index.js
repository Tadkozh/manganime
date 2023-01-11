import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ENV_DEV } from '../commons/constants'
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
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProviders>{children}</AuthProviders>
      {process.env.NODE_ENV === ENV_DEV && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

export { AppProviders }
