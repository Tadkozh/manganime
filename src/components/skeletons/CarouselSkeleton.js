import { Box, Paper, Skeleton } from '../ui'

const CarouselSkeleton = () => {
  const circularSize = 10
  const nbCircular = 11
  let list = []
  for (let i = 0; i < nbCircular; i++) {
    list.push(i)
  }

  return (
    <Paper
      sx={{
        mt: '1em',
        pt: '1em',
        px: '1em',
        width: '100%',
        height: '30.5em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Skeleton
        width={'100%'}
        height={'92%'}
        sx={{ m: 0, p: 0 }}
        variant="rectangular"
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '5px',
          alignItems: 'center',
          mt: 3,
        }}
      >
        {list.map((_item, index) => (
          <Skeleton
            variant="circular"
            width={circularSize}
            height={circularSize}
            key={index}
          />
        ))}
      </Box>
    </Paper>
  )
}

export { CarouselSkeleton }
