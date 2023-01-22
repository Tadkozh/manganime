import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Rating } from '@mui/material'
import { INFOS } from '../../commons/constants'

// CSS Files
import './search.css'

// Components
import SearchBar from './SearchBar'
import { getUrl } from '../../utils/helper'
import { useSearch } from '../../hooks/queriesHooks'

function SearchManga() {
  const type = 'manga'

  const [getData, setGetData] = useState()
  const [query, setQuery] = useState({
    inputValue: '',
    letter: '',
    scoreMin: '',
    type: '',
    status: '',
    orderBy: '',
    sort: '',
    hideHentai: true,
    page: 1,
  })

  const letterUrl = query?.letter !== '' ? `?letter=${query?.letter}` : '?'
  const scoreMinUrl =
    query?.scoreMin !== '' ? `&min_score=${query?.scoreMin}` : ''
  const typeUrl = query?.type !== '' ? `&type=${query?.type}` : ''
  const statusUrl = query?.status !== '' ? `&status=${query?.status}` : ''
  const orderByUrl = query?.orderBy !== '' ? `&order_by=${query?.orderBy}` : ''
  const sortUrl = query?.sort !== '' ? `&sort=${query?.sort}` : `&sort=desc`
  const hideHentaiUrl = query?.hideHentai ? `&sfw` : ''

  const options = useMemo(() => {
    return `${letterUrl}${scoreMinUrl}${typeUrl}${statusUrl}${orderByUrl}${sortUrl}${hideHentaiUrl}`
  }, [
    hideHentaiUrl,
    letterUrl,
    orderByUrl,
    scoreMinUrl,
    sortUrl,
    statusUrl,
    typeUrl,
  ])
  const data = useSearch(type, options, query.page)

  useMemo(() => {
    if (data) {
      setGetData(data)
    }
  }, [data])

  return (
    <>
      {getData?.data ? (
        <>
          <div className="search">
            <Pagination
              onChange={(e, p) => setQuery({ ...query, page: p })}
              className="pagination"
              count={getData?.pagination?.last_visible_page}
            />

            <SearchBar
              type={type}
              data={data}
              query={query}
              setQuery={setQuery}
            />
          </div>

          <div className="searchData">
            {getData?.data.map((data, index) => {
              return (
                <div className="item" key={index}>
                  <Link to={getUrl(type, INFOS, [data.mal_id])}>
                    <div className="imgWrapper">
                      <img
                        src={data.images.jpg.image_url}
                        alt={`small cover ${data.mal_id}`}
                      />
                    </div>
                    <p>{data.title_english ?? data.titles[0].title}</p>
                    <Rating
                      value={data.score / 2}
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
              count={getData?.pagination.last_visible_page}
            />
          </div>
        </>
      ) : null}
    </>
  )
}

export default SearchManga
