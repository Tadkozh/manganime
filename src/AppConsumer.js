import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
  ROUTE_404,
  ROUTE_HOME,
  ROUTE_LOGIN_REGISTER,
  ROUTE_PROFILE,
} from './commons/constants'
import { Error404 } from './components/Error404'
import { ErrorFallback } from './components/ErrorFallBack'
import { LoginRegister } from './components/LoginRegister'
import { MangAnime } from './components/MangAnime'
import PageInfo from './components/page info/pageInfo'
import SearchAnime from './components/search/searchAnime'
import SearchManga from './components/search/searchManga'
import InfosManga from './components/page info/infosManga'
import NewsById from './components/page info/NewsById'
import RecommendationById from './components/page info/RecommendationById'
import Reviews from './components/page info/reviews'
import { PrivateRoute } from './components/PrivateRoute'
import { UserProfile } from './components/UserProfile'

const AppConsumer = () => {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}></ErrorBoundary>
      <Routes>
        <Route path={ROUTE_HOME} element={<MangAnime />} />
        <Route path={ROUTE_LOGIN_REGISTER} element={<LoginRegister />} />
        <Route path="/search-anime" element={<SearchAnime />} />
        <Route path="/search-manga" element={<SearchManga />} />
        <Route path="/infosManga" element={<InfosManga />}>
          <Route path="/infosManga/main/:id/:title" element={<PageInfo />} />
          <Route path="/infosManga/main/:id/" element={<PageInfo />} />
          <Route path="/infosManga/news/:id/" element={<NewsById />} />
          <Route
            path="/infosManga/recommendations/:id"
            element={<RecommendationById />}
          />
          <Route path="/infosManga/reviews/:id/:title" element={<Reviews />} />
        </Route>
        <Route path={ROUTE_404} element={<Error404 />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path={ROUTE_PROFILE} element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppConsumer
