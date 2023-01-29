import { Box, Grid, Typography } from '@mui/material'

function InfoSynopsis({ synopsis }) {
  // const [readSynopsis, setReadSynopsis] = useState(false)

  return (
    <>
      <Grid item xs={12} sm={6} md={4} sx={{ order: { md: '-1' } }}>
        <Typography component="h4">Synopsis:</Typography>
        <Box
          sx={{
            overflowY: 'auto',
            pr: '10px',
            border: 'solid',
          }}
          dangerouslySetInnerHTML={{ __html: synopsis }}
          // className={
          //   readSynopsis ? 'synopsis active' : 'synopsis inactive'
          // }
        ></Box>
        {/* <Button onClick={() => setReadSynopsis(!readSynopsis)}>
        {readSynopsis ? 'Read less' : 'Read more'}
      </Button> */}
      </Grid>
    </>
  )
}

export default InfoSynopsis
