import { useParams } from 'react-router-dom'
import { useReviews, useTitle } from '../../hooks/queriesHooks'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from '../ui'

function InfoReviews() {
  let { type, id } = useParams()
  const dataTitle = useTitle(type, id)
  const title =
    dataTitle?.Page?.media[0]?.title?.romaji ??
    dataTitle?.Page?.media[0]?.title?.english

  const reviews = useReviews(type, id)
  const info = reviews?.Page?.media[0]?.reviews?.nodes

  return (
    info && (
      <>
        {info.length < 1 ? (
          <Typography sx={{ textAlign: 'center', p: '10px' }}>
            This {type} has no reviews yet.
          </Typography>
        ) : (
          <Box
            id="reviews"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '5px',
            }}
          >
            <Typography
              component="h3"
              variant="h4"
              sx={{
                p: '10px',
                m: '10px 0',
              }}
            >
              {info.length} Review{info.length !== 1 && 's'} about {title}
            </Typography>
            {info.map((data, index) => {
              const timestampCreated = info[index].createdAt
              const dateCreated = new Date(timestampCreated * 1000)
              const timestampUpdated = info[index].updatedAt
              const dateUpdated = new Date(timestampUpdated * 1000)

              return (
                <Review data={data} create={dateCreated} update={dateUpdated} />
              )
            })}
          </Box>
        )}
      </>
    )
  )
}

const Review = ({ data, create, update }) => {
  return (
    <Card
      sx={{
        p: 1,
        mb: 3,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={data.user.avatar.medium}
            variant="circular"
            sx={{ height: '65px', width: '65px' }}
          />
        }
        title={`${data.user.name} | Published the
                        ${create.toLocaleString()} | Updated the
                        ${update.toLocaleString()}`}
        subheader={data.summary}
        action={
          <Rating
            name="rating"
            value={data.score / 20}
            precision={0.5}
            readOnly
          />
        }
      />
      <CardContent>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: data.body,
          }}
          sx={{ p: 2, overflowX: 'hidden', width: '100%' }}
        />
      </CardContent>
    </Card>
  )
}

export default InfoReviews
