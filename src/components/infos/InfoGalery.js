import * as React from 'react'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

import { useParams } from 'react-router-dom'
import { useGalery } from '../../hooks/queriesHooks'

import { Close } from '@mui/icons-material'

function InfoGalery({ mainImage, mainLargeImage }) {
  let { type, id } = useParams()
  const data = useGalery(type, id)

  const [largeImg, setLargeImg] = React.useState(false)
  const [activeStep, setActiveStep] = React.useState(-1)
  const maxSteps = data?.data?.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    if (activeStep > data?.data?.length - 2) {
      setActiveStep(-1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    if (activeStep < 0) {
      setActiveStep(data?.data?.length - 1)
    }
  }

  return data?.data ? (
    <>
      <LargeImage
        data={data}
        activeStep={activeStep}
        maxSteps={maxSteps}
        mainLargeImage={mainLargeImage}
        handleNext={handleNext}
        handleBack={handleBack}
        largeImg={largeImg}
        setLargeImg={setLargeImg}
      />

      {data?.data?.length > 1 ? (
        <>
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            {activeStep === -1 ? (
              <img
                src={mainImage}
                alt="Poster of the artwork"
                onClick={() => setLargeImg(!largeImg)}
              />
            ) : (
              <img
                onClick={() => setLargeImg(!largeImg)}
                src={data?.data[activeStep]?.jpg?.image_url}
                alt="Poster of the artwork"
              />
            )}
            <MobileStepper
              variant="text"
              steps={maxSteps + 1}
              position="static"
              activeStep={activeStep + 1}
              nextButton={
                <Button size="small" onClick={handleNext}>
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack}>
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </Box>
        </>
      ) : (
        <img src={mainImage} alt="Poster of the artwork" />
      )}
    </>
  ) : null
}

function LargeImage({
  data,
  activeStep,
  maxSteps,
  mainLargeImage,
  handleNext,
  handleBack,
  largeImg,
  setLargeImg,
}) {
  return (
    <>
      {data?.data?.length > 1 ? (
        <>
          <Box
            sx={{
              flexGrow: 1,
              display: largeImg ? 'flex' : 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'fixed',
              top: '50%',
              left: 0,
              transform: 'translateY(-50%)',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: 2000,
            }}
          >
            <Close
              sx={{ color: 'red', fontSize: '50px' }}
              onClick={() => setLargeImg(!largeImg)}
            />
            <img
              style={{ maxHeight: '100%' }}
              src={
                activeStep === -1
                  ? mainLargeImage
                  : data?.data[activeStep]?.jpg?.large_image_url
              }
              alt="Poster of the artwork"
              onClick={() => setLargeImg(!largeImg)}
            />

            <MobileStepper
              variant="text"
              steps={maxSteps + 1}
              position="static"
              activeStep={activeStep + 1}
              nextButton={
                <Button size="small" onClick={handleNext}>
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack}>
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </Box>
        </>
      ) : null}
    </>
  )
}

export default InfoGalery
