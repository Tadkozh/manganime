import Trending from './Trending'
import { MANGA } from '../commons/constants'

const TrendingMangaPage = (limit) => {
  limit = 5000

  return (
    <>
      <Trending type={MANGA} limit={limit} />
    </>
  )
}

export default TrendingMangaPage
