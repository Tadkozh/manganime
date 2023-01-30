import React, { useMemo, useState } from 'react'
import { ANIME, INFOS, PAGE } from '../../commons/constants'
import { Box, Button } from '../ui'

import SearchBar from './SearchBar'

import { useSearch } from '../../hooks/queriesHooks'
import { useSearchFieldsParams } from '../../hooks/search'
import { CardImage } from '../ui/CardImage'

function SearchAnime() {
  const type = ANIME

  const [getData, setGetData] = useState([])
  const [moreData, setMoreData] = useState(false)
  const {
    setValue: setQuery,
    resetFields: resetQuery,
    state: query,
  } = useSearchFieldsParams()

  const { data, fetchNextPage, isFetchingNextPage } = useSearch(type, query)

  const handleLoadMore = () => {
    setMoreData(true)
    setQuery(PAGE)
    fetchNextPage()
  }

  useMemo(() => {
    if (data) {
      if (moreData && getData[query - 1] !== data) {
        setGetData([...getData, data.pages[0]])
        setMoreData(false)
      } else {
        setGetData(data.pages)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const hasNextPage = useMemo(
    () => getData?.[query.page - 1]?.Page?.pageInfo?.hasNextPage,
    [getData, query.page],
  )

  React.useEffect(() => {
    const scrollDown = setTimeout(
      () =>
        window.scroll({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        }),
      300,
    )
    return () => clearTimeout(scrollDown)
  }, [moreData])

  return (
    <>
      <SearchBar
        type={type}
        query={query}
        setQuery={setQuery}
        resetQuery={resetQuery}
      />
      {getData ? (
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
          {getData.map((page) =>
            page.Page.media.map((data, index) => {
              return (
                <CardImage data={data} type={type} route={INFOS} key={index} />
              )
            }),
          )}
        </Box>
      ) : null}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          m: 1,
        }}
      >
        <Button
          onClick={handleLoadMore}
          variant="contained"
          sx={{ width: 'max-content' }}
          disabled={hasNextPage ? false : true}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </Button>
      </Box>
    </>
  )
}

export default SearchAnime
