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

const StatsDropdowns = ({ userDatas, contentInfos, setData }) => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const whichContentArray =
    contentInfos?.type === 'ANIME' ? 'animeId' : 'mangaId'
  const getActiveStatName = userDatas?.stats?.find((stats) =>
    stats[whichContentArray]?.includes(contentInfos?.id),
  )?.name

  const handleMenuItemClick = async (event, name) => {
    const user = await updateStat(name, contentInfos, userDatas)
    setData(user)
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

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button sx={{ maxWidth: 'max-content' }}>
          {getActiveStatName ?? nameStats[0]}
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
                    .filter(
                      (item) =>
                        item !== nameStats[0] && item !== getActiveStatName,
                    )
                    .map((name, index) => (
                      <MenuItem
                        key={index}
                        // selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, name)}
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
