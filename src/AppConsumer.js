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

import Collection from './components/collections/search/Collection'
import AnimeSearch from './components/collections/search/AnimeSearch'
import MangaSearch from './components/collections/search/MangaSearch'
import AnimeTop from './components/collections/top/AnimeTop'
import MangaTop from './components/collections/top/MangaTop'

// import AnimeMain from './components/collections/AnimeMain'
// import MangaMain from './components/collections/MangaMain'
import Main from './components/collections/Main'

import News from './components/collections/News'
import Recommendations from './components/collections/Recommendations'
import { PrivateRoute } from './components/PrivateRoute'
import { UserProfile } from './components/UserProfile'

import MangAnimeAppBar from './components/header/MangAnimeAppBar'
const AppConsumer = () => {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}></ErrorBoundary>
      <MangAnimeAppBar />
      <Routes>
        <Route path={ROUTE_HOME} element={<MangAnime />} />
        <Route path={ROUTE_LOGIN_REGISTER} element={<LoginRegister />} />

        <Route path="/collection" element={<Collection />}>
          <Route path="/collection/anime/search" element={<AnimeSearch />} />
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
          />
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
