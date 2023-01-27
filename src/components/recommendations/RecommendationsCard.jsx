import { Link, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from './../ui'

// Components
import { INFOS } from '../../commons/constants'
import { getUrl } from '../../utils/helper'

const RecommendationsCard = ({ data }) => {
  let { type } = useParams()

  return (
    <Paper elevation={24}>
      <Card sx={{ maxWidth: 225 }}>
        <Link to={getUrl(type, INFOS, [data.id])}>
          <CardMedia
            height={335}
            component="img"
            image={data.coverImage.large}
            alt={data.title.english ?? data.title.romaji}
          />
        </Link>
        <CardContent sx={{ height: 140 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{ height: 64, textAlign: 'center' }}
          >
            {data.title.english ?? data.title.romaji}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* <Button
              variant="contained"
              href={data.entry.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </Button> */}
          </Box>
        </CardContent>
      </Card>
    </Paper>
  )
}

export default RecommendationsCard
