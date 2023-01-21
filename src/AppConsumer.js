import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
  ROUTE_404,
  ROUTE_HOME,
  ROUTE_INFOS,
  ROUTE_LOGIN_REGISTER,
  ROUTE_NEWS,
  ROUTE_PROFILE,
  ROUTE_RECOMMENDATIONS,
  ROUTE_SEARCH_ANIME,
  ROUTE_SEARCH_MANGA,
  ROUTE_TOP_ANIME,
  ROUTE_TOP_MANGA,
} from './commons/constants'
import { Error404 } from './components/error/Error404'
import { ErrorFallback } from './components/error/ErrorFallBack'
import Infos from './components/infos/Infos'
import { LoginRegister } from './components/LoginRegister'
import { MangAnime } from './components/MangAnime'
import News from './components/news/News'
import { PrivateRoute } from './components/PrivateRoute'
import ProfileUser from './components/profile/ProfileUser'
import Recommendations from './components/recommendations/Recommendations'
import SearchAnime from './components/search/SearchAnime'
import SearchManga from './components/search/SearchManga'
import TopAnime from './components/top/TopAnime'
import TopManga from './components/top/TopManga'

import BasicModal from './components/Modal'

import MangAnimeHeader from './components/MangAnimeHeader'
const AppConsumer = () => {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MangAnimeHeader />
        <Routes>
          {/* route provisoire */}
          <Route path="/modal" element={<BasicModal />} />

          <Route path={ROUTE_HOME} element={<MangAnime />} />
          <Route path={ROUTE_LOGIN_REGISTER} element={<LoginRegister />} />
          <Route path={ROUTE_SEARCH_ANIME} element={<SearchAnime />} />
          <Route path={ROUTE_SEARCH_MANGA} element={<SearchManga />} />
          <Route path={ROUTE_TOP_ANIME} element={<TopAnime />} />
          <Route path={ROUTE_TOP_MANGA} element={<TopManga />} />
          <Route path={ROUTE_INFOS} element={<Infos />} />
          <Route path={ROUTE_NEWS} element={<News />} />
          <Route path={ROUTE_RECOMMENDATIONS} element={<Recommendations />} />
          <Route path={ROUTE_404} element={<Error404 />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path={ROUTE_PROFILE} element={<ProfileUser />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Router>
  )
}

export default AppConsumer
