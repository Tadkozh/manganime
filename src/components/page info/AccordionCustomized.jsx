import * as React from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Item from '@mui/material/Stack'
import Button from '@mui/material/Button'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  // '&:not(:last-child)': {
  //   borderBottom: 0,
  // },
  // '&:before': {
  //   display: 'none',
  // },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

export default function AccordionCustomized({ data }) {
  const [expanded, setExpanded] = React.useState('panel1')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
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
    </div>
  )
}
