import { Box, Typography } from '@mui/material'

function InfoSynopsis({ synopsis }) {
  // const [readSynopsis, setReadSynopsis] = useState(false)

  return (
    <>
      <Typography component="h3" variant="h4" sx={{ pl: '10px', mb: '10px' }}>
        Synopsis:
      </Typography>
      <Box
        sx={{
          p: '0 10px',
          overflowY: 'auto',
        }}
        dangerouslySetInnerHTML={{ __html: synopsis }}
        // className={
        //   readSynopsis ? 'synopsis active' : 'synopsis inactive'
        // }
      ></Box>
      {/* <Button onClick={() => setReadSynopsis(!readSynopsis)}>
        {readSynopsis ? 'Read less' : 'Read more'}
      </Button> */}
    </>
  )
}

export default InfoSynopsis
