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

import SearchAnime from './components/search/searchAnime'

import PageInfo from './components/page info/pageInfo'
import Reviews from './components/page info/reviews'

const AppConsumer = () => {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}></ErrorBoundary>
      <Routes>
        <Route path="/" element={<MangAnime />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/news" element={<NewsAnime />} />
        <Route path="/recommendations" element={<RecommendationAnim />} />
        <Route path="/search-anime" element={<SearchAnime />}></Route>
        <Route path="/infos/:id/:title" element={<PageInfo />}>
          <Route path="/infos/:id/:title/reviews" element={<Reviews />}></Route>
        </Route>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route path="/infos" element={<PageInfo />} />
      </Routes>
    </Router>
  )
}

export default AppConsumer
