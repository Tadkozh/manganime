import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router, Routes } from 'react-router-dom'
import { ErrorFallback } from './components/ErrorFallBack'

const AppConsumer = () => {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}></ErrorBoundary>
      <Routes></Routes>
    </Router>
  )
}

export default AppConsumer
