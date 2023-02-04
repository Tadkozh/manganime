import { useState } from 'react'
import { Box, Button, Paper, Typography } from '../ui'

function InfoSynopsis({ info }) {
  const [readSynopsis, setReadSynopsis] = useState(false)
  const MAX_LENGTH = 400
  const description = info?.description || ''
  const truncatedDescription =
    description.length > MAX_LENGTH
      ? description.slice(0, MAX_LENGTH) + '...'
      : description

  return (
    <Paper
      sx={{
        m: 2,
        p: 2,
      }}
    >
      <Typography component="h3" variant="h4" sx={{ my: 1 }}>
        Synopsis:
      </Typography>
      <Box
        dangerouslySetInnerHTML={{
          __html: readSynopsis ? description : truncatedDescription,
        }}
      />

      {description.length > MAX_LENGTH && (
        <Button
          variant="contained"
          onClick={() => setReadSynopsis(!readSynopsis)}
          sx={{
            m: '10px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {readSynopsis ? 'Read more' : 'Read less'}
        </Button>
      )}
    </Paper>
  )
}

export default InfoSynopsis
