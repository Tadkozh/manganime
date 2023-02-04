import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useReviews, useTitle } from '../../hooks/queriesHooks'
import {
  Avatar,
  Box,
  Button,
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

  const [moreReviews, setMoreReviews] = useState(3)

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
                ml: 1,
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
                index < moreReviews && (
                  <Review
                    data={data}
                    create={dateCreated}
                    update={dateUpdated}
                  />
                )
              )
            })}

            <Button
              variant="contained"
              onClick={() => setMoreReviews(moreReviews + 3)}
              sx={{ mx: 'auto' }}
            >
              See more reviews
            </Button>
          </Box>
        )}
      </>
    )
  )
}

const Review = ({ data, create, update }) => {
  const [readReview, setReadReview] = useState(false)

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          m: 2,
          border: 'solid 1px',
        }}
      >
        <Box
          sx={{
            maxHeight: readReview ? 'auto' : '300px',
            overflowY: 'hidden',
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                src={data.user.avatar.medium}
                variant="circular"
                sx={{
                  width: '65px',
                  height: '65px',
                }}
              />
            }
            title={
              <>
                <Rating
                  name="rating"
                  value={data.score / 20}
                  precision={0.5}
                  readOnly
                  sx={{ mr: 0 }}
                />
                <br />
                {data.user.name}
                <br />
                {data.summary}
              </>
            }
            subheader={
              <>
                Published the {create.toLocaleString()}
                <br />
                Updated the {update.toLocaleString()}
              </>
            }
            // action={
            //   <Rating
            //     name="rating"
            //     value={data.score / 20}
            //     precision={0.5}
            //     readOnly
            //   />
            // }
          />
          <CardContent>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{
                __html: data.body,
              }}
              sx={{ p: 2, width: '100%' }}
            />
          </CardContent>
        </Box>
        <Button
          variant="contained"
          onClick={() => setReadReview(!readReview)}
          sx={{ mt: 1, mx: 'auto' }}
        >
          {readReview ? 'Read less' : 'Read full review'}
        </Button>
      </Card>
    </>
  )
}

export default InfoReviews
