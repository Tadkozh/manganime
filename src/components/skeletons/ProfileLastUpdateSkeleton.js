import { Card, Grid, Skeleton, Typography } from '../ui'
import { PosterImageSkeleton } from './PosterImageSkeleton'

const ProfileLastUpdateSkeleton = ({ nbElement = 3 }) => {
  const postersImages = []
  for (let i = 0; i < nbElement; i++) {
    postersImages.push(<PosterImageSkeleton key={i} />)
  }
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6">
        <Skeleton />
      </Typography>
      <Card sx={{ display: 'flex', flexDirection: 'column', m: 1, p: 1 }}>
        {postersImages}
      </Card>
    </Grid>
  )
}

export { ProfileLastUpdateSkeleton }
