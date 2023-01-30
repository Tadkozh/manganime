import {
  Card, Container, Skeleton,
  Typography
} from '../ui'

const ListCardsSkeleton = ({ nbCard = 30 }) => {
  let list = []
  for (let i = 0; i < nbCard; i++) {
    list.push(i)
  }
  return list.map((item, index) => {
    return <CardImageSkeleton key={index} />
  })
}
const CardImageSkeleton = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Skeleton variant="rectangular" height={280} width={280} />

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

