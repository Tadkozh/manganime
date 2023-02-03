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
      <Trending type={ANIME} />
      <Trending type={MANGA} />
    </>
  )
}

export { MangAnime }
