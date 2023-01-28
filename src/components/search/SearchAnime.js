import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Rating } from '../ui'
import { getUrl } from '../../utils/helper'
import { INFOS, ANIME } from '../../commons/constants'

// CSS Files
import './search.css'

// Components
import SearchBar from './SearchBar'

// Hooks
import { useSearch } from '../../hooks/queriesHooks'

function SearchAnime() {
  const type = ANIME

  const [getData, setGetData] = useState()

  const [query, setQuery] = useState({
    search: null,
    format: 'TV',
    status: 'FINISHED',
    score: 0,
    popularity: 0,
    sortBy: 'TRENDING_DESC',
    isAdult: false,
    page: 1,
    perPage: 30,
  })

  const data = useSearch(type, query)

  useMemo(() => {
    if (data) {
      setGetData(data)
    }
  }, [data])

  console.log('data search', data)

  return (
    <>
      {getData?.Page ? (
        <>
          <div className="search">
            <Pagination
              onChange={(e, p) => setQuery({ ...query, page: p })}
              className="pagination"
              count={getData?.Page?.pageInfo?.lastPage}
            />

            <SearchBar
              type={type}
              data={getData?.Page}
              query={query}
              setQuery={setQuery}
            />
          </div>

          <div className="searchData">
            {getData?.Page.media.map((data, index) => {
              return (
                <div className="item" key={index}>
                  <Link to={getUrl(type, INFOS, [data.id])}>
                    <div className="imgWrapper">
                      <img
                        src={data.coverImage.large}
                        alt={`small cover of ${
                          data.title.english ?? data.title.romaji
                        }`}
                      />
                    </div>
                    <p>{data.title.english ?? data.title.romaji}</p>
                    <Rating
                      value={data.averageScore / 20}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                  </Link>
                </div>
              )
            })}
          </div>

          <div className="paginationBottom">
            <Pagination
              onChange={(e, p) => setQuery({ ...query, page: p })}
              className="pagination"
              count={getData?.Page?.pageInfo?.lastPage}
            />
          </div>
        </>
      ) : null}
    </>
  )
}

export default SearchAnime
