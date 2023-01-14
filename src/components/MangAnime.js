import { MangAnimeAppBar } from './MangAnimeAppBar'
import TopDetails from './TopDetails'

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
