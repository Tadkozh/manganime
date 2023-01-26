import React from 'react'
import {
  ArrowDropDownIcon,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '../ui'

const options = [
  'Add to :',
  'Watching',
  'Completed',
  'On-hold',
  'Dropped',
  'Plan-to-watch',
]

const StatsDropdowns = () => {
  const [stat, setStat] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`)
    console.info(' Stat : ', stat)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  React.useEffect(() => {
    setStat(`${options[selectedIndex]}`)
  }, [selectedIndex])

  return (
    <>
      <ButtonGroup
        // variant put by default in contained/div with Material UI.
        // But with actual css config created it makes a large appearance.
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClick} sx={{ maxWidth: 'max-content' }}>
          {options[selectedIndex]}
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default StatsDropdowns
