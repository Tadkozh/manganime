import CarouselBox from './carousel/CarouselBox'
import TopDetails from './top/TopDetails'
import Trending from './Trending'
import { ANIME, MANGA } from '../commons/constants'

const MangAnime = () => {
  return (
    <>
      <CarouselBox />
      <TopDetails isHomePage type={ANIME} />
      <TopDetails isHomePage type={MANGA} />
      <Trending isHomePage type={ANIME} />
      <Trending isHomePage type={MANGA} />
    </>
  )
}

export { MangAnime }
