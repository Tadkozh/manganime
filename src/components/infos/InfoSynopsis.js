import { useState } from 'react'
import { Box, Button, Paper, Typography } from '../ui'

function InfoSynopsis({ info }) {
  const [readSynopsis, setReadSynopsis] = useState(false)

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
        sx={{ maxHeight: readSynopsis ? 'auto' : '200px', overflow: 'hidden' }}
        dangerouslySetInnerHTML={{ __html: info?.description }}
      ></Box>

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
        {readSynopsis ? 'Read less' : 'Read more'}
      </Button>
    </Paper>
  )
}

export default InfoSynopsis
