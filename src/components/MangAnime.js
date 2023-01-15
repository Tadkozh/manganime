import TopDetails from './TopDetails'
import MangAnimeAppBar from './header/MangAnimeAppBar'

const MangAnime = () => {
  return (
    <>
      <MangAnimeAppBar />
      <TopDetails name={'anime'} />
      <TopDetails name={'manga'} />
    </>
  )
}

export { MangAnime }
