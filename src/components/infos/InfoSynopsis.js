import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useSynopsis } from '../../hooks/queriesHooks'

function InfoSynopsis() {
  let { type, id } = useParams()
  const data = useSynopsis(type, id)
  const synopsis = data?.Page?.media[0]?.description

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
