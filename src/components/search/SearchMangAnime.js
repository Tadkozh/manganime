import React from 'react'
import { INFOS } from '../../commons/constants'
import { Box, Button } from '../ui'

import SearchBar from './SearchBar'

import { useSearch } from '../../hooks/queriesHooks'
import { useSearchFieldsParams } from '../../hooks/search'
import { ListCardsSkeleton } from '../skeletons/CardImageSkeleton'
import { CardImage } from '../ui/CardImage'

function SearchMangAnime({type}) {

  const {
    setValue: setQuery,
    resetFields: resetQuery,
    state: query,
  } = useSearchFieldsParams(type)

  const {
    data: getData,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useSearch(type, query)

  const handleLoadMore = () => {
    fetchNextPage()
  }

  return (
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
        {getData !== undefined ? (
          getData.map((page) =>
            page.Page.media.map((data, index) => {
              return (
                <CardImage data={data} type={type} route={INFOS} key={index} />
              )
            }),
          )
        ) : (
          <ListCardsSkeleton />
        )}
        {isFetching && getData?.length > 0 ? <ListCardsSkeleton /> : null}
      </Box>
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
          {isFetching
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </Button>
      </Box>
    </>
  )
}

export default SearchMangAnime
