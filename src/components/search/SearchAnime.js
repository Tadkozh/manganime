import { useMemo, useState } from 'react'
import { ANIME, INFOS, PAGE } from '../../commons/constants'
import { Box, Pagination } from '../ui'

import SearchBar from './SearchBar'

import { useSearch } from '../../hooks/queriesHooks'
import { useSearchFieldsParams } from '../../hooks/search'
import { CardImage } from '../ui/CardImage'

function SearchAnime() {
  const type = ANIME

  const [getData, setGetData] = useState()
  const {
    setValue: setQuery,
    resetFields: resetQuery,
    state: query,
  } = useSearchFieldsParams()

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
          <Box>
            <SearchBar
              type={type}
              query={query}
              setQuery={setQuery}
              resetQuery={resetQuery}
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
                <CardImage data={data} type={type} route={INFOS} key={index} />
              )
            })}
          </Box>
        </>
      ) : null}

      <PaginationItem pageInfo={getData?.Page?.pageInfo} setQuery={setQuery} />
    </>
  )
}

function PaginationItem({ pageInfo, setQuery }) {
  return (
    <Pagination
      onChange={(e, p) => setQuery(PAGE, p)}
      count={pageInfo?.lastPage}
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
