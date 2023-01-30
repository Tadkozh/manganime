import React, { useMemo, useState } from 'react'
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

  React.useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [query?.page])

  return (
    <>
      {getData?.Page ? (
        <>
          <SearchBar
            type={type}
            query={query}
            setQuery={setQuery}
            resetQuery={resetQuery}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, 200px)',
              justifyContent: 'center',
              gap: '20px',
              padding: '10px',
              mx: 4,
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
      <PaginationItem
        pageInfo={getData?.Page?.pageInfo}
        setQuery={setQuery}
        page={query.page}
      />
    </>
  )
}

function PaginationItem({ pageInfo, setQuery, page }) {
  return (
    <Pagination
      onChange={(e, p) => setQuery(PAGE, p)}
      count={pageInfo?.lastPage}
      page={page}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
      }}
    />
  )
}

export default SearchAnime
