import CarouselBox from './carousel/CarouselBox'
import TopDetails from './top/TopDetails'
import Trending from './Trending'
import { ANIME, MANGA } from '../commons/constants'

const MangAnime = () => {
  const limit = 10
  return (
    <>
      <CarouselBox />
      <TopDetails isHomePage type={ANIME} />
      <TopDetails isHomePage type={MANGA} />
      <Trending type={ANIME} limit={limit} />
      <Trending type={MANGA} limit={limit} />
    </>
  )
}

export { MangAnime }
