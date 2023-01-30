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
import { updateStat } from '../../database/user'

const nameStats = [
  'Add To List',
  'Watching',
  'Completed',
  'On-hold',
  'Dropped',
  'Plan-to-watch',
]

const StatsDropdowns = ({ userDatas, contentInfos }) => {
  const [stat, setStat] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  // console.log('datas before click : ', userDatas?.stats)

  const handleClick = () => {
    updateStat(stat, contentInfos, userDatas)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index + 1)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef?.current && anchorRef?.current?.contains(event?.target)) {
      return
    }
    setOpen(false)
  }

  React.useEffect(() => {
    setStat(`${nameStats[selectedIndex]}`)
  }, [contentInfos.type, selectedIndex])

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClick} sx={{ maxWidth: 'max-content' }}>
          {nameStats[selectedIndex]}
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
                  {nameStats
                    .filter((name, index) => index !== 0)
                    .map((name, index) => (
                      <MenuItem
                        key={index}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {name}
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
