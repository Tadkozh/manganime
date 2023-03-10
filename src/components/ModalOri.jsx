import * as React from 'react'
import { Box, Button, Cancel, Modal, Typography } from './ui'

import { FormLogin } from './LoginRegister'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function ModaleOri() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            textAlign="right"
            sx={{
              display: 'flex',
              justifyContent: 'right',
              alignItem: 'center',
            }}
          >
            <Button onClick={handleClose}>
              Close
              <Cancel />
            </Button>
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            For subscribers only
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please login or create an account to access this feature
          </Typography>
          <FormLogin />
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              sx={{
                marginTop: 5,
                textDecoration: 'none',
              }}
            >
              <Link
                to={ROUTE_LOGIN_REGISTER}
                style={{ textDecoration: 'none' }}
              >
                Login | Create an account
              </Link>
            </Button>
          </Box> */}
        </Box>
      </Modal>
    </div>
  )
}
