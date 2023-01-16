import { useTheme } from '@mui/material'
import * as React from 'react'
import { useNavigate } from 'react-router'
import avatarProfile from '../../assets/images/avatar_2.gif'
import { ReactComponent as LogoIconDark } from '../../assets/images/logo_dark.svg'
import { ReactComponent as LogoIconLight } from '../../assets/images/logo_light.svg'
import {
  LIGHT,
  ROUTE_SEARCH_ANIME,
  ROUTE_SEARCH_MANGA,
  ROUTE_HOME,
  ROUTE_LOGIN_REGISTER,
  ROUTE_PROFILE,
  ROUTE_TOP_ANIME,
  ROUTE_TOP_MANGA,
} from '../../commons/constants'
import { useAuth } from '../../context/AuthContext'
import { ColorModeContext } from '../../context/ColorModeContext'
import { useStorageColorTheme } from '../../hooks/storageColorTheme'
import MUISwitchMode from '../../MUISwitchMode'
import {
  HOME,
  HOME_CHILDREN,
  SEARCH_ANIME,
  SEARCH_MANGA,
  SEARCH_ANIME_CHILDREN,
  SEARCH_MANGA_CHILDREN,
  TOP_ANIME_CHILDREN,
  TOP_MANGA_CHILDREN,
  LOG_IN,
  LOG_OUT,
  PROFILE,
  TOP_ANIME,
  TOP_MANGA,
} from '../../utils/constants'
import { getImageName } from '../../utils/helper'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuIcon,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '..'

const pages = [HOME, TOP_ANIME, TOP_MANGA, SEARCH_ANIME, SEARCH_MANGA]
const pagesChildren = [
  HOME_CHILDREN,
  TOP_ANIME_CHILDREN,
  TOP_MANGA_CHILDREN,
  SEARCH_ANIME_CHILDREN,
  SEARCH_MANGA_CHILDREN,
]
const settings = [PROFILE, LOG_OUT, LOG_IN]

const getPropsTypo = {
  mr: 1,
  my: 1,
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
}

const MangAnimeAppBar = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  const mode = theme.palette.mode

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MUISwitchMode
            mode={mode}
            onClick={colorMode.toggleColorMode}
            checked={mode === LIGHT ? false : true}
            sx={{ mr: 4 }}
          />
          <AppBarLogo
            display={{ xs: 'none', md: 'flex' }}
            variant="body1"
            navigate={navigate}
          />
          <AppBarMenu navigate={navigate} />
          <AppBarProfile navigate={navigate} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const AppBarLogo = ({
  variant,
  display,
  flexGrow = 0.4,
  arialabel = 'desktop',
  navigate,
}) => {
  const { getColor } = useStorageColorTheme()
  const handleCLick = () => {
    navigate(ROUTE_HOME)
  }
  const props = {
    role: 'img',
    'aria-label': `Logo MangAnime ${arialabel}`,
    onClick: handleCLick,
  }
  const Logo = getColor() === LIGHT ? <LogoIconLight /> : <LogoIconDark />

  return (
    <Typography
      variant={variant}
      noWrap
      component="a"
      sx={{
        ...getPropsTypo,
        display: display,
        flexGrow: flexGrow,
        letterSpacing: '.3rem',
        fontWeight: 700,
        textDecoration: 'none',
        '&:hover': { cursor: 'pointer' },
      }}
      {...props}
    >
      {Logo}
    </Typography>
  )
}

const handleMenuOption = (option, navigate) => {
  if (typeof option !== 'object') {
    switch (option) {
      case HOME:
        navigate(ROUTE_HOME)
        break
      case TOP_ANIME:
        navigate(ROUTE_TOP_ANIME)
        break
      case TOP_MANGA:
        navigate(ROUTE_TOP_MANGA)
        break
      case SEARCH_ANIME:
        navigate(ROUTE_SEARCH_ANIME)
        break
      case SEARCH_MANGA:
        navigate(ROUTE_SEARCH_MANGA)
        break
      default:
        throw new Error('Option dans le menu app bar non défini')
    }
  }
}

const AppBarMenu = ({ navigate }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(false)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = (option) => {
    setAnchorElNav(null)
    handleMenuOption(option, navigate)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {pages.map((page, index) => (
          <MenuItem key={index} onClick={() => handleCloseNavMenu(page)}>
            <Typography
              sx={{
                display: 'flex',
                gap: '5px',
              }}
              textAlign="center"
            >
              {pagesChildren[index]}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      <AppBarLogo
        display={{ xs: 'flex', md: 'none' }}
        variant="h5"
        flexGrow={0.75}
        arialabel={'mobile'}
        navigate={navigate}
      />
      <Typography
        variant={'h5'}
        noWrap
        component="a"
        href="/"
        sx={{
          ...getPropsTypo,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1.25,
          letterSpacing: '.9rem',
          fontWeight: 700,
          textDecoration: 'none',
        }}
      ></Typography>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexGrow: 1,
        }}
      >
        {pages.map((page, index) => (
          <Button
            key={index}
            onClick={() => handleCloseNavMenu(page)}
            sx={{
              display: 'flex',
              gap: '5px',
              color: '#fff',
              my: 2,
              boxShadow: '0 0 5px -3px',
              margin: '0 5px',
            }}
          >
            {pagesChildren[index]}
          </Button>
        ))}
      </Box>
    </>
  )
}

const handleAuthOption = (option, navigate, logout) => {
  if (typeof option !== 'object') {
    switch (option) {
      case LOG_IN:
        navigate(ROUTE_LOGIN_REGISTER)
        break
      case LOG_OUT:
        logout()
        navigate(ROUTE_HOME)
        break
      case PROFILE:
        navigate(ROUTE_PROFILE)
        break
      default:
        throw new Error('option dans le menu app bar non défini')
    }
  }
}
const AppBarProfile = ({ navigate }) => {
  const { logout } = useAuth()
  const [anchorElUser, setAnchorElUser] = React.useState(false)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (option) => {
    setAnchorElUser(null)
    handleAuthOption(option, navigate, logout)
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={getImageName(avatarProfile)} src={avatarProfile} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default MangAnimeAppBar
