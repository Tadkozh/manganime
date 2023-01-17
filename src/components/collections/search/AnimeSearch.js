import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Rating } from '@mui/material'

// CSS Files
import './search.css'

// Components
import SearchBar from './SearchBar'

function AnimeSearch() {
  const [getAnime, setGetAnime] = useState()
  const [inputValue, setInputValue] = useState('')
  const [letter, setLetter] = useState('')
  const [scoreMin, setScoreMin] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [rating, setRating] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [sort, setSort] = useState('')
  const [hentai, setHentai] = useState(true)
  const [page, setPage] = useState(1)

  const letterUrl = letter !== '' ? `?letter=${letter}` : '?'
  const scoreMinUrl = scoreMin !== '' ? `&min_score=${scoreMin}` : ''
  const typeUrl = type !== '' ? `&type=${type}` : ''
  const statusUrl = status !== '' ? `&status=${status}` : ''
  const ratingUrl = rating !== '' ? `&rating=${rating}` : ''
  const orderByUrl = orderBy !== '' ? `&order_by=${orderBy}` : ''
  const sortUrl = sort !== '' ? `&sort=${sort}` : `&sort=asc`
  const hentaiUrl = hentai ? `&sfw` : ''

  const link = `https://api.jikan.moe/v4/anime${letterUrl}${scoreMinUrl}${typeUrl}${statusUrl}${ratingUrl}${orderByUrl}${sortUrl}${hentaiUrl}&page=${page}`
console.log("link: " + link)

  useEffect(() => {
    fetch(link)
      .then((res) => res.json())
      .then((data) => setGetAnime(data))
  }, [link])

  return (
    <>
      {getAnime?.data ? (
        <>
          <div className="search">
            <Pagination
              onChange={(e, p) => setPage(p)}
              className="pagination"
              count={getAnime?.pagination?.last_visible_page}
              color="primary"
            />

            <SearchBar
              collectionType="anime"
              getAnime={getAnime}
              inputValue={inputValue}
              setLetter={setLetter}
              setInputValue={setInputValue}
              scoreMin={scoreMin}
              setScoreMin={setScoreMin}
              type={type}
              setType={setType}
              status={status}
              setStatus={setStatus}
              rating={rating}
              setRating={setRating}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              sort={sort}
              setSort={setSort}
              hentai={hentai}
              setHentai={setHentai}
              setPage={setPage}
            />
          </div>

          <div className="searchData">
            {getAnime.data.map((data, index) => {
              return (
                <div className="item" key={index}>
                  <Link
                    to={`/collection/anime/search/main/${data.mal_id}/${
                      data.title_english ?? data.titles[0].title
                    }`}
                  >
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
              onChange={(e, p) => setPage(p)}
              className="pagination"
              count={getAnime.pagination.last_visible_page}
              color="primary"
            />
          </div>
        </>
      ) : null}
    </>
  )
}

export default AnimeSearch
