import { ErrorTemplate } from './ErrorTemplate'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return <ErrorTemplate error={error} reset={resetErrorBoundary} />
}

export { ErrorFallback }
