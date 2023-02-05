import { useTheme } from '@mui/material'
import { Typography } from '../ui/index'

const sxTopIcon = (theme) => ({
  textTransform: 'uppercase',
  fontWeight: 'bold',
  marginTop: '0.2em',
  position: 'absolute',
  top: '0.4em',
  zIndex: '2',
  left: '-1em',
  height: '3em',
  width: '3em',
  borderRadius: '50%',
  m: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: theme.palette.background.topIcon,
  boxShadow: `inset 0 0 10px ${theme.palette.background.topIcon}, 0 0 9px 3px ${theme.palette.background.topIcon}`,
})
const TopIcon = ({ text }) => {
  const theme = useTheme()
  return (
    <Typography component="p" sx={sxTopIcon(theme)}>
      {text}
    </Typography>
  )
}

export { TopIcon }

