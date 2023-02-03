import Trending from './Trending'
import { ANIME } from '../commons/constants'

const TrendingAnimePage = (limit) => {
  limit = 5000

  return (
    <>
      <Trending type={ANIME} limit={limit} />
    </>
  )
}

export default TrendingAnimePage
