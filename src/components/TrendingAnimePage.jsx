import Trending from './Trending'
import { ANIME } from '../commons/constants'

const TrendingAnimePage = () => {
  const limit = 5000

  return (
    <>
      <Trending type={ANIME} limit={limit} />
    </>
  )
}

export { TrendingAnimePage }
