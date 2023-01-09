import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ErrorFallback } from './components/ErrorFallBack'
import { MangAnime } from './components/MangAnime'

const AppConsumer = () => {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}></ErrorBoundary>
      <Routes>
        <Route path="/" element={<MangAnime />} />
      </Routes>
    </Router>
  )
}

export default AppConsumer
