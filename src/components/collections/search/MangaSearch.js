import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Rating } from '@mui/material'

// CSS Files
import './search.css'

// Components
import SearchBarManga from './SearchBarManga'

function MangaSearch() {
  const [getManga, setGetManga] = useState()
  const [inputValue, setInputValue] = useState('')
  const [letter, setLetter] = useState('')
  const [scoreMin, setScoreMin] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [hentai, setHentai] = useState(true)
  const [page, setPage] = useState(1)

  const letterUrl = letter !== '' ? `?letter=${letter}` : '?'
  const scoreMinUrl = scoreMin !== '' ? `&min_score=${scoreMin}` : ''
  const typeUrl = type !== '' ? `&type=${type}` : ''
  const statusUrl = status !== '' ? `&status=${status}` : ''
  const hentaisUrl = hentai ? `&sfw` : ''

  const link = `https://api.jikan.moe/v4/manga${letterUrl}${scoreMinUrl}${typeUrl}${statusUrl}${hentaisUrl}&page=${page}`

  useEffect(() => {
    fetch(link)
      .then((res) => res.json())
      .then((data) => setGetManga(data))
  }, [link])

  return (
    <>
      {getManga?.data ? (
        <>
          <div className="search">
            <Pagination
              onChange={(e, p) => setPage(p)}
              className="pagination"
              count={getManga?.pagination?.last_visible_page}
              color="primary"
            />

            <SearchBarManga
              getManga={getManga}
              inputValue={inputValue}
              setLetter={setLetter}
              setInputValue={setInputValue}
              scoreMin={scoreMin}
              setScoreMin={setScoreMin}
              type={type}
              setType={setType}
              status={status}
              setStatus={setStatus}
              hentai={hentai}
              setHentai={setHentai}
              setPage={setPage}
            />
          </div>

          <div className="searchData">
            {getManga.data.map((data, index) => {
              return (
                <div className="item" key={index}>
                  <Link
                    to={`/collection/manga/search/main/${data.mal_id}/${
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
              count={getManga.pagination.last_visible_page}
              color="primary"
            />
          </div>
        </>
      ) : null}
    </>
  )
}

export default MangaSearch
