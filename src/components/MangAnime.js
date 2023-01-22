import Carousel from './carousel/Carousel'
import TopDetails from './top/TopDetails'
import { ANIME, MANGA } from '../commons/constants'

const MangAnime = () => {
  return (
    <>
      <Carousel></Carousel>
      <TopDetails isHomePage type={ANIME} />
      <TopDetails isHomePage type={MANGA} />
    </>
  )
}

export { MangAnime }
