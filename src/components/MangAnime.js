import TopDetails from './top/TopDetails'
import { ANIME, MANGA } from '../commons/constants'

const MangAnime = () => {
  return (
    <>
      <TopDetails isHomePage type={ANIME} />
      <TopDetails isHomePage type={MANGA} />
    </>
  )
}

export { MangAnime }
