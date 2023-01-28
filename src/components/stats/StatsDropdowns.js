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

// const options = [
//   'Add to :',
//   'Watching',
//   'Completed',
//   'On-hold',
//   'Dropped',
//   'Plan-to-watch',
// ]

// const optionsTest = [
//   // { name: 'Add to :' },
//   { name: 'Watching', animeId: [10, 30, 30], mangaId: [30] },
//   { name: 'Completed', animeId: [], mangaId: [2] },
// ]
// console.log(optionsTest.map((optionsTest) => optionsTest.animeId))
// optionsTest[1].animeId.push(1000)
// console.log(optionsTest.map((optionsTest) => optionsTest.animeId))
// console.log(
//   optionsTest.map(
//     (optionsTest) => optionsTest.animeId.length + optionsTest.mangaId.length,
//   ),
// )

const options = [
  { name: 'Add to List :', animeId: [], mangaId: [] },
  { name: 'Watching', animeId: [], mangaId: [] },
  { name: 'Completed', animeId: [], mangaId: [] },
  { name: 'On-hold', animeId: [], mangaId: [] },
  { name: 'Dropped', animeId: [], mangaId: [] },
  { name: 'Plan-to-watch', animeId: [], mangaId: [] },
]
// console.log(options)

const StatsDropdowns = ({ userDatas, contentInfos }) => {
  const [stat, setStat] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [newStat, setNewStat] = React.useState(userDatas?.data?.stats)

  // console.log('content infos:', contentInfos)
  // console.log('user datas in StatsDropdowns :', userDatas)
  // console.log('new user datas in StatsDropdowns :', newStat)

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex].name}`)
    console.info(' Stat : ', stat)
    updateStat(stat, contentInfos.type, contentInfos.id, userDatas)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index + 1)
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
    setStat(`${options[selectedIndex].name}`)
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
          {options[selectedIndex].name}
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
                  {userDatas.data.stats
                    .filter((option, index) => index !== 0)
                    .map((option, index) => (
                      <MenuItem
                        key={index}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option.name}
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
