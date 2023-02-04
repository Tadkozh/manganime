import React, { useState, useRef } from 'react'
import { Box, Button, Paper, Typography } from '../ui'

function InfoSynopsise({ info }) {
  const [readSynopsis, setReadSynopsis] = useState(false)
  const textRef = useRef(null)

  const handleClick = () => {
    setReadSynopsis(!readSynopsis)
  }

  return (
    <Paper
      sx={{
        m: 2,
        p: 2,
      }}
    >
      {info?.description && (
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
      )}

      {textRef.current && textRef.current.offsetHeight > 200 && (
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            m: '10px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {readSynopsis ? 'Read less' : 'Read more'}
        </Button>
      )}
      <Typography component="h3" variant="h4" sx={{ my: 1 }}>
        Synopsis:
      </Typography>
      <Box
        ref={textRef}
        sx={{ maxHeight: readSynopsis ? 'auto' : '200px', overflow: 'hidden' }}
        dangerouslySetInnerHTML={{ __html: info?.description }}
      />
    </Paper>
  )
}

export default InfoSynopsise
