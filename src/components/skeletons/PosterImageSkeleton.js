import { Box, Skeleton, Typography } from '../ui'

const PosterImageSkeleton = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        m: 1,
        alignItems: 'center',
        height: '75px',
      }}
    >
      <Skeleton height={'90px'} width={'50px'} />
      <div style={{ ...getProps }}>
        <Typography variant="text" sx={{ mx: 1, width: '300px' }}>
          <Skeleton />
        </Typography>
        <Typography variant="text" sx={{ mx: 1, width: '200px' }}>
          <Skeleton />
        </Typography>
      </div>
    </Box>
  )
}

const getProps = {
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
}

export { PosterImageSkeleton }

