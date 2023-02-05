import { sxTopBox, sxTopPaper } from '../top/TopView'
import { Box, Card, Container, Paper, Skeleton, Typography } from '../ui'

const ListCardsSkeleton = ({ dimension = {}, nbCard = 30, top = {} }) => {
  let list = []
  for (let i = 0; i < nbCard; i++) {
    list.push(i)
  }

  return top?.isUse ? (
    <Box component="ul" sx={sxTopBox(top?.isHomePage)}>
      {list.map((_item, index) => (
        <Paper component="li" sx={sxTopPaper} key={`${index}top`}>
          <CardImageSkeleton key={index} dimension={dimension} />
        </Paper>
      ))}
    </Box>
  ) : (
    list.map((_item, index) => (
      <CardImageSkeleton key={index} dimension={dimension} />
    ))
  )
}

const CardImageSkeleton = ({ dimension = {} }) => {
  return (
    <Card
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: dimension.maxWidth,
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
