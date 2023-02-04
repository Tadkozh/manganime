import * as React from 'react'
import Box from '@mui/material/Box'

import { Modal } from '@mui/material'

function InfoGalery({ info }) {
  const collectionType = info?.type?.toLowerCase()

  const [isOpen, setIsOpen] = React.useState(false)

  return (
    info && (
      <>
        <Box
          component="img"
          src={info.coverImage.large}
          alt={`Poster of the ${collectionType}`}
          onClick={() => setIsOpen(!isOpen)}
          sx={{ maxWidth: 'fit-content' }}
        />

        <ModalImage info={info} open={isOpen} setIsOpen={setIsOpen} />
      </>
    )
  )
}

const sxModalImage = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  flexGrow: 1,
  transform: 'translate(-50%, -50%)',
  height: '80%',
  bgcolor: 'background.paper',
}

function ModalImage({ info, open, setIsOpen }) {
  const collectionType = info?.type?.toLowerCase()

  return (
    <Modal
      open={open}
      onClick={() => setIsOpen(false)}
      aria-labelledby="modalLargeImage"
      aria-describedby={`modal for large image of ${collectionType}`}
    >
      <Box
        component={'img'}
        src={info.coverImage.extraLarge}
        sx={sxModalImage}
      />
    </Modal>
  )
}

export default InfoGalery

// ANCIENNE GALERIE AVEC CAROUSEL MAIS RETIRÉ CAR NE MARCHE QU'AVEC JIKAN BOUHOUUU

//   const [largeImg, setLargeImg] = React.useState(false)
//   const [activeStep, setActiveStep] = React.useState(-1)
//   const maxSteps = data?.data?.length

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1)
//     if (activeStep > data?.data?.length - 2) {
//       setActiveStep(-1)
//     }
//   }

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1)
//     if (activeStep < 0) {
//       setActiveStep(data?.data?.length - 1)
//     }
//   }

//   return data?.data ? (
//     <>
//       <LargeImage
//         data={data}
//         activeStep={activeStep}
//         maxSteps={maxSteps}
//         mainLargeImage={mainLargeImage}
//         handleNext={handleNext}
//         handleBack={handleBack}
//         largeImg={largeImg}
//         setLargeImg={setLargeImg}
//       />

//       {data?.data?.length > 1 ? (
//         <>
//           <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
//             {activeStep === -1 ? (
//               <img
//                 src={mainImage}
//                 alt="Poster of the artwork"
//                 onClick={() => setLargeImg(!largeImg)}
//               />
//             ) : (
//               <img
//                 onClick={() => setLargeImg(!largeImg)}
//                 src={data?.data[activeStep]?.jpg?.image_url}
//                 alt="Poster of the artwork"
//               />
//             )}
//             <MobileStepper
//               variant="text"
//               steps={maxSteps + 1}
//               position="static"
//               activeStep={activeStep + 1}
//               nextButton={
//                 <Button size="small" onClick={handleNext}>
//                   Next
//                   <KeyboardArrowRight />
//                 </Button>
//               }
//               backButton={
//                 <Button size="small" onClick={handleBack}>
//                   <KeyboardArrowLeft />
//                   Back
//                 </Button>
//               }
//             />
//           </Box>
//         </>
//       ) : (
//         <img src={mainImage} alt="Poster of the artwork" />
//       )}
//     </>
//   ) : null
// }
