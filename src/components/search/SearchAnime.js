import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardMedia, Pagination, Rating, Typography } from '../ui'
import { getUrl } from '../../utils/helper'
import { INFOS, ANIME } from '../../commons/constants'

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

  return (
    <>
      {getData?.Page ? (
        <>
          <Box sx={{ backgroundColor: 'salmon' }}>
            <PaginationItem
              getData={getData}
              query={query}
              setQuery={setQuery}
            />

            <SearchBar
              type={type}
              data={getData?.Page}
              query={query}
              setQuery={setQuery}
            />
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, 200px)',
              justifyContent: 'center',
              gap: '20px',
              maxWidth: '1920px',
              padding: '10px',
            }}
          >
            {getData?.Page.media.map((data, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    backgroundColor: 'bisque',
                    fontSize: '1rem',
                    textAlign: 'center',
                    padding: '10px 10px 5px',
                    border: 'solid 0px blue',
                    borderRadius: '10px',
                    transition: '0.25s',
                    ':hover a': {
                      justifyContent: 'space-evenly',
                    },
                    ':hover .imgWrapper': {
                      boxShadow: '0 5px 30px -5px',
                    },
                    ':hover img': {
                      transform: 'scale(1.1)',
                    },
                    ':hover': {
                      backgroundColor: 'rgb(255, 204, 142)}',
                    },
                  }}
                >
                  <Link
                    to={getUrl(type, INFOS, [data.id])}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#000',
                      textDecoration: 'none',
                    }}
                  >
                    <Card
                      className="imgWrapper"
                      sx={{
                        overflow: 'hidden',
                        borderRadius: '5px',
                        boxShadow: '0 0 15px -5px',
                        transition: '0.5s',
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={data.coverImage.large}
                        alt={`small cover of ${
                          data.title.romaji ?? data.title.english
                        }`}
                        sx={{
                          height: '100%',
                          borderRadius: '5px',
                          transition: '0.25s',
                        }}
                      />
                    </Card>
                    <Typography
                      component="p"
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5px',
                        color: '#000',
                        textDecoration: 'none',
                      }}
                    >
                      {data.title.romaji ?? data.title.english}
                    </Typography>
                    <Rating
                      value={data.averageScore / 20}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                  </Link>
                </Box>
              )
            })}
          </Box>
        </>
      ) : null}

      <PaginationItem getData={getData} query={query} setQuery={setQuery} />
    </>
  )
}

function PaginationItem({ getData, query, setQuery }) {
  return (
    <Pagination
      onChange={(e, p) => setQuery({ ...query, page: p })}
      count={getData?.Page?.pageInfo?.lastPage}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'salmon',
        padding: '10px',
      }}
    />
  )
}

export default SearchAnime
