import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
  ROUTE_404,
  ROUTE_HOME,
  ROUTE_INFOS,
  ROUTE_LOGIN_REGISTER,
  ROUTE_PROFILE,
  ROUTE_PROFILE_CAT,
  ROUTE_PROFILE_STAT,
  ROUTE_RECOMMENDATIONS,
  ROUTE_SEARCH_ANIME,
  ROUTE_SEARCH_MANGA,
  ROUTE_STREAMING,
  ROUTE_TOP_ANIME,
  ROUTE_TOP_MANGA,
} from './commons/constants'

import { Error404 } from './components/error/Error404'
import { ErrorFallback } from './components/error/ErrorFallBack'
import { LoginRegister } from './components/LoginRegister'
import { MangAnime } from './components/MangAnime'
import { PrivateRoute } from './components/PrivateRoute'
import MangAnimeHeader from './components/MangAnimeHeader'
import ProfileUser from './components/profile/ProfileUser'
import SearchAnime from './components/search/SearchAnime'
import SearchManga from './components/search/SearchManga'
import TopAnime from './components/top/TopAnime'
import TopManga from './components/top/TopManga'
import Infos from './components/infos/Infos'
import Streaming from './components/streaming/Streaming'
import Recommendations from './components/recommendations/Recommendations'

const AppConsumer = () => {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MangAnimeHeader />
        <Routes>
          <Route path={ROUTE_HOME} element={<MangAnime />} />
          <Route path={ROUTE_LOGIN_REGISTER} element={<LoginRegister />} />
          <Route path={ROUTE_SEARCH_ANIME} element={<SearchAnime />} />
          <Route path={ROUTE_SEARCH_MANGA} element={<SearchManga />} />
          <Route path={ROUTE_TOP_ANIME} element={<TopAnime />} />
          <Route path={ROUTE_TOP_MANGA} element={<TopManga />} />
          <Route path={ROUTE_INFOS} element={<Infos />} />
          <Route path={ROUTE_STREAMING} element={<Streaming />} />
          <Route path={ROUTE_RECOMMENDATIONS} element={<Recommendations />} />
          <Route path={ROUTE_404} element={<Error404 />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path={ROUTE_PROFILE} element={<ProfileUser />} />
            <Route
              path={ROUTE_PROFILE_CAT}
              element={<ProfileUser isStatNav />}
            />
            <Route
              path={ROUTE_PROFILE_STAT}
              element={<ProfileUser isStatNav isStatOn />}
            />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Router>
  )
}

export default AppConsumer
