import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ErrorFallback } from './components/ErrorFallBack'
import { MangAnime } from './components/MangAnime'
import { LoginRegister } from './components/LoginRegister'
import { Error404 } from './components/Error404'
import { NewsAnime } from './components/NewsAnime'
import { RecommendationAnim } from './components/RecommendationAnim'
import { UserProfile } from './components/UserProfile'
import { PrivateRoute } from './components/PrivateRoute'

const AppConsumer = () => {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}></ErrorBoundary>
      <Routes>
        <Route path="/" element={<MangAnime />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/news" element={<NewsAnime />} />
        <Route path="/recommendations" element={<RecommendationAnim />} />
        <Route path="*" element={<Error404 />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Routes>
      NewsAnime
    </Router>
  )
}

export default AppConsumer
