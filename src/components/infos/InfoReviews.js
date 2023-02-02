import { Box, CardMedia, Paper, Rating, Typography } from '../ui'
import { useParams } from 'react-router-dom'
import { useTitle, useReviews } from '../../hooks/queriesHooks'

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
      <Paper
        elevation={6}
        sx={{
          maxWidth: '100%',
          m: '10px auto',
        }}
      >
        <Box
          id="reviews"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
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
            {info.length} reviews about {title}
          </Typography>
          {info.map((data, index) => {
            const timestampCreated = info[index].createdAt
            const dateCreated = new Date(timestampCreated * 1000)
            const timestampUpdated = info[index].updatedAt
            const dateUpdated = new Date(timestampUpdated * 1000)

            return (
              <Box
                key={index}
                sx={{
                  p: '10px',
                  borderRadius: '10px',
                  mb: '20px',
                }}
              >
                <Box
                  sx={{
                    minHeight: '75px',
                    mb: '10px',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      maxWidth: '75px',
                      minHeight: '50px',
                      maxHeight: '75px',
                      border: 'solid 1px',
                      mr: '10px',
                      float: 'left',
                    }}
                    image={data.user.avatar.medium}
                    alt={`Avatar of ${data.user.name}`}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      {data.user.name} | Published the{' '}
                      {dateCreated.toLocaleString()} | Updated the{' '}
                      {dateUpdated.toLocaleString()}
                    </Typography>
                    <Typography>{data.summary}</Typography>
                    <Rating
                      name="rating"
                      // defaultValue={data[0]?.score / 20}
                      value={data.score / 20}
                      precision={0.5}
                      readOnly
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    maxHeight: '150px',
                    overflowY: 'auto',
                    padding: '10px',
                    boxShadow: '0 0 8px -5px',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: data.body,
                  }}
                ></Box>
              </Box>
            )
          })}
        </Box>
      </Paper>
    )
  )
}

export default InfoReviews
