import { useTheme } from '@mui/material'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LIGHT } from './commons/constants'
import { Error404 } from './components/Error404'
import { ErrorFallback } from './components/ErrorFallBack'
import { LoginRegister } from './components/LoginRegister'
import { MangAnime } from './components/MangAnime'
import { NewsAnime } from './components/NewsAnime'
import { NewsById } from './components/NewsById'
import PageInfo from './components/page info/pageInfo'
import { PrivateRoute } from './components/PrivateRoute'
import { RecommendationAnim } from './components/RecommendationAnim'
import { UserProfile } from './components/UserProfile'
import { ColorModeContext } from './context/ColorModeContext'
import MUISwitchMode from './MUISwitchMode'
import Reviews from './components/page info/reviews'
import SearchAnime from './components/search/searchAnime'
import AppSkeleton from './components/AppSkeleton'

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
      <ErrorBoundary FallbackComponent={ErrorFallback}></ErrorBoundary>
      <Routes>
        <Route path="/" element={<MangAnime />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/newsAccoCustom" element={<NewsAnime />} />
        <Route path="/news" element={<NewsById />} />
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
        <Route path="/skeleton" element={<AppSkeleton />} />
      </Routes>
    </Router>
  )
}

export default AppConsumer
