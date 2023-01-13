import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from '@mui/material'

// CSS Files
import './searchAnime.css'

function SearchAnime() {
  const [getAnime, setGetAnime] = useState()
  const [inputValue, setInputValue] = useState('')
  const [scoreMin, setScoreMin] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)

  const link = `https://api.jikan.moe/v4/anime${
    inputValue !== ''
      ? scoreMin !== ''
        ? `?letter=${inputValue}&min_score=${scoreMin}`
        : `?letter=${inputValue}&min_score=0`
      : scoreMin !== ''
      ? `?min_score=${scoreMin}`
      : '?'
  }${type !== '' ? `&type=${type}` : ''}${
    status !== '' ? `&status=${status}` : ''
  }&page=${page}`

  console.log('link: ' + link)
  console.log('type: ' + type)

  // const filteredTitles = getAnime?.data.filter((item) =>
  //   item?.title_english === null
  //     ? item?.titles[0]?.title
  //         ?.toLowerCase()
  //         .indexOf(inputValue.toLowerCase().trim()) !== -1
  //     : item?.title_english
  //         ?.toLowerCase()
  //         .indexOf(inputValue.toLowerCase().trim()) !== -1,
  // )

  function handleChange(e, p) {
    setPage(p)
  }

  useEffect(() => {
    fetch(link)
      .then((res) => res.json())
      .then((data) => setGetAnime(data))
  }, [link])

  return (
    <>
      {getAnime?.data ? (
        <p>
          per_page {getAnime.pagination.items.per_page}
          <br />
          count {getAnime.pagination.items.count}
        </p>
      ) : null}

      <Pagination
        onChange={handleChange}
        className="pagination"
        count={getAnime?.pagination?.last_visible_page}
        color="primary"
      />

      <div className="settingsBar">
        <p>{getAnime?.pagination?.items?.total} results</p>

        <label for="typeInput">Type: </label>
        <select
          name="typeInput"
          onChange={(e) => setType(e.target.value)}
          id="typeInput"
        >
          <option value="">All</option>
          <option value="tv">Serie</option>
          <option value="movie">Movie</option>
          <option value="ova">OVA</option>
          <option value="special">Special</option>
          <option value="ona">ONA</option>
          <option value="music">Music</option>
        </select>

        <label for="scoreInput">Score (min) : </label>
        <select
          name="scoreInput"
          onChange={(e) => setScoreMin(e.target.value)}
          id="scoreInput"
        >
          <option value="">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>

        <label for="statusInput">Status: </label>
        <select
          name="statusInput"
          onChange={(e) => setStatus(e.target.value)}
          id="statusInput"
        >
          <option value="">All</option>
          <option value="airing">Airing</option>
          <option value="complete">Complete</option>
          <option value="upcoming">Upcoming</option>
        </select>

        <input
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      {getAnime?.data ? (
        <div className="searchAnime">
          {getAnime.data.map((data, index) => {
            return (
              <div className="item" key={index}>
                <Link
                  to={`/infos/${data.mal_id}/${
                    data.title_english ?? data.titles[0].title
                  }`}
                >
                  <img
                    src={data.images.jpg.image_url}
                    alt={`small cover ${data.mal_id}`}
                  />
                  <p>{data.title_english ?? data.titles[0].title}</p>
                </Link>
              </div>
            )
          })}
        </div>
      ) : null}

      <Pagination
        onChange={handleChange}
        className="pagination"
        count={getAnime?.pagination?.last_visible_page}
        color="primary"
        style={{ justifyContent: 'center' }}
      />
    </>
  )
}

export default SearchAnime
