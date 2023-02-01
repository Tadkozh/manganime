import { Card, Container, Skeleton, Typography } from '../ui'

const ListCardsSkeleton = ({ dimension = {}, nbCard = 30 }) => {
  let list = []
  for (let i = 0; i < nbCard; i++) {
    list.push(i)
  }
  return list.map((_item, index) => {
    return <CardImageSkeleton key={index} dimension={dimension} />
  })
}

const CardImageSkeleton = ({ dimension = {} }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Skeleton
        variant="rectangular"
        height={dimension?.height}
        width={dimension?.width}
      />

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          my: 2,
          p: 0,
        }}
      >
        <Typography component="p">
          <Skeleton />
        </Typography>
      </Container>
    </Card>
  )
}

export { ListCardsSkeleton }
