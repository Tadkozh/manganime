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
