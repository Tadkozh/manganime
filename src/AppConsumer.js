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
import { LoginRegister } from './components/LoginRegister'
import { MangAnime } from './components/MangAnime'

import SearchAnime from './components/search/SearchAnime'
import SearchManga from './components/search/SearchManga'
import TopAnime from './components/top/TopAnime'
import TopManga from './components/top/TopManga'

import Infos from './components/infos/Infos'

import News from './components/news/News'
import Recommendations from './components/Recommendations'
import { PrivateRoute } from './components/PrivateRoute'
import { ProfileUser } from './components/profile/ProfileUser'

import MangAnimeHeader from './components/MangAnimeHeader'
const AppConsumer = () => {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}></ErrorBoundary>
      <MangAnimeHeader />
      <Routes>
        <Route path={ROUTE_HOME} element={<MangAnime />} />
        <Route path={ROUTE_LOGIN_REGISTER} element={<LoginRegister />} />

        {/* <Route path="/collection" element={<Collection />}> */}
        {/* <Route path="/collection/anime/search" element={<AnimeSearch />} />
          <Route path="/collection/manga/search" element={<MangaSearch />} />
          <Route path="/collection/anime/top" element={<AnimeTop />} />
          <Route path="/collection/manga/top" element={<MangaTop />} />

          <Route
            path="/collection/:collectionType/search/main/:id/:title"
            element={<Main />}
          />
          <Route
            path="/collection/:collectionType/search/news/:id/:title"
            element={<News />}
          />
          <Route
            path="/collection/:collectionType/search/recommendations/:id/:title"
            element={<Recommendations />}
          /> */}
        {/* </Route> */}

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
    </Router>
  )
}

export default AppConsumer
