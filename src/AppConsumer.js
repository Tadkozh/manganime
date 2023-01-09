import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ErrorFallback } from './components/ErrorFallBack'
import { MangAnime } from './components/MangAnime'
import { LoginRegister } from './components/LoginRegister'
import { Error404 } from './components/Error404'

const AppConsumer = () => {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}></ErrorBoundary>
      <Routes>
        <Route path="/" element={<MangAnime />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  )
}

export default AppConsumer
