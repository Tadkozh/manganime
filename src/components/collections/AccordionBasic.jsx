// import Accordion from '@mui/material/Accordion'
// import AccordionSummary from '@mui/material/AccordionSummary'
// import AccordionDetails from '@mui/material/AccordionDetails'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import Typography from '@mui/material/Typography'
// import Stack from '@mui/material/Stack'
// import Item from '@mui/material/Stack'
// import Button from '@mui/material/Button'

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ExpandMoreIcon,
  Stack,
  Item,
  Button,
  Typography,
} from '..'

export const AccordionBasic = ({ data }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          background: 'silver',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
          }}
        >
          {data.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          spacing={2}
        >
          <Item sx={{ width: 300, textAlign: 'center' }}>
            <img src={data.images.jpg.image_url} alt="" target="_blank" />
          </Item>
          <Item sx={{ maxWidth: 300, textAlign: 'center' }}>
            <span>Excerpt: {data.excerpt}</span>
            <p>
              <Button
                variant="contained"
                href={data.forum_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                See article
              </Button>
            </p>
          </Item>
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}
