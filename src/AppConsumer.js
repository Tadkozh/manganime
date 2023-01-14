import { useTheme } from '@mui/material'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LIGHT } from './commons/constants'
import { Error404 } from './components/Error404'
import { ErrorFallback } from './components/ErrorFallBack'
import { LoginRegister } from './components/LoginRegister'
import Header from './components/header/header'
import { MangAnime } from './components/MangAnime'
import SearchAnime from './components/search/searchAnime'
import SearchManga from './components/search/searchManga'
import PageInfo from './components/page info/pageInfo'
import { NewsById } from './components/page info/NewsById'
import { RecommendationById } from './components/page info/RecommendationById'
// import { NewsAnime } from './components/NewsAnime'
import Reviews from './components/page info/reviews'
import { PrivateRoute } from './components/PrivateRoute'
import { UserProfile } from './components/UserProfile'
import { ColorModeContext } from './context/ColorModeContext'
import MUISwitchMode from './MUISwitchMode'

const AppConsumer = () => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  const mode = theme.palette.mode

  return (
    <Router>
      <MUISwitchMode
        mode={mode}
        onClick={colorMode.toggleColorMode}
        checked={mode === LIGHT ? false : true}
      />
      <Header />
      <ErrorBoundary FallbackComponent={ErrorFallback}></ErrorBoundary>
      <Routes>
        <Route path="/" element={<MangAnime />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/news" element={<NewsById />} />
        <Route path="/recommendations" element={<RecommendationById />} />
        <Route path="/search-anime" element={<SearchAnime />}></Route>
        <Route path="/search-manga" element={<SearchManga />}></Route>
        <Route path="/infos/:id/:title" element={<PageInfo />}>
          <Route path="/infos/:id/:title/reviews" element={<Reviews />}></Route>
        </Route>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppConsumer
