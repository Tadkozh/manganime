import CarouselBox from './carousel/CarouselBox'
import TopDetails from './top/TopDetails'
import { ANIME, MANGA } from '../commons/constants'

const MangAnime = () => {
  return (
    <>
      <CarouselBox></CarouselBox>
      <TopDetails isHomePage type={ANIME} />
      <TopDetails isHomePage type={MANGA} />
    </>
  )
}

export { MangAnime }
