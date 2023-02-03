import { Box, Paper, Typography } from '../ui'

function InfoSynopsis({ synopsis, title }) {
  return (
    <Paper
      sx={{
        m: 2,
        py: 2,
      }}
    >
      <Typography component="h2" variant="h5" sx={{ m: 1, mb: 3 }}>
        {title?.romaji ?? title?.english}
      </Typography>
      <Box
        sx={{
          p: '0 10px',
          overflowY: 'auto',
        }}
        dangerouslySetInnerHTML={{ __html: synopsis }}
      ></Box>
    </Paper>
  )
}

export default InfoSynopsis
