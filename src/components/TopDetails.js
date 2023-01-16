import React from 'react'
import useGetTopDatas from '../hooks/getTopDatas'
import TopView from './TopView'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import '../styles/top-css.css'

const TopDetails = ({ name }) => {
  const { topDatas } = useGetTopDatas(name)

  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = topDatas.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <>
      <article className=" top-article">
        <MobileStepper
          sx={{
            position: 'absolute',
            top: '55%',
            width: '100%',
            backgroundColor: 'inherit',
            '.MuiMobileStepper-dots': {
              display: 'none',
            },
          }}
          variant="dots"
          steps={maxSteps}
          position="static"
          nextButton={
            <Button
              // hover
              sx={{
                zIndex: 1,
                color: '#fff',
                '&:hover': { backgroundColor: 'rgba(68,68,68,0.5)' },
              }}
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              className="top-article--arrow"
              sx={{
                zIndex: 1,
                color: '#fff',
                '&:hover': { backgroundColor: 'rgba(68,68,68,0.5)' },
              }}
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </Button>
          }
        />
        <h2>Top {name}</h2>
        <TopView datas={topDatas} />
      </article>
    </>
  )
}

export default TopDetails
