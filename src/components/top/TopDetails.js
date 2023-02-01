import { Grid, useTheme } from '@mui/material'
import React from 'react'
import { LOADING, SUCCESS } from '../../commons/constants'
import { useTop } from '../../hooks/queriesHooks'
import { ListCardsSkeleton } from '../skeletons/CardImageSkeleton'
import {
  Button, KeyboardArrowLeft,
  KeyboardArrowRight,
  MobileStepper,
  Typography
} from '../ui'
import TopView from './TopView'

const rankReducer = (state, action) => {
  switch (action?.type) {
    case 'Next':
      return { minRank: state?.minRank + 1, maxRank: state?.maxRank + 1 }
    case 'Prev':
      return { minRank: state?.minRank - 1, maxRank: state?.maxRank - 1 }
    default:
      return { minRank: 0, maxRank: 4 }
  }
}

const TopDetails = ({ type, isHomePage = false }) => {
  const { data: topDatas, status } = useTop(type)
  const [filteredTopDatas, setFilteredTopDatas] = React.useState([])

  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = topDatas?.length
  const nbPerPage = 4

  const [rank, dispatch] = React.useReducer(rankReducer, {
    minRank: 0,
    maxRank: nbPerPage,
  })

  const theme = useTheme()
  const sxTopContainerHomePage = {
    maxWidth: '1600px',
    position: 'relative',
    m: '2em 0',
    p: '1em 0',
    bgcolor: theme.palette.background.default,
    boxShadow:
      '0px 2px 4px 2px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
  }
  const sxArrow = {
    zIndex: 1,
    // color: 'rgb(68,68,68)',
    // ':hover': { bgcolor: 'rgba(68,68,68,0.5)' },
    color: theme.palette.primary,
    ':hover': {
      bgcolor: theme.palette.text.secondary,
      opacity: '0.5',
    },
  }

  React.useEffect(() => {
    if (topDatas) {
      setFilteredTopDatas(
        topDatas?.Page?.media?.slice(rank?.minRank, rank?.maxRank),
      )
    }
  }, [rank?.maxRank, rank?.minRank, topDatas])

  const isExist = React.useMemo(() => {
    if (filteredTopDatas.length > 0 && topDatas !== undefined) {
      return (
        filteredTopDatas[filteredTopDatas.length - 1]?.id ===
        topDatas?.Page?.media[topDatas?.Page?.media.length - 1].id
      )
    } else {
      return false
    }
  }, [filteredTopDatas, topDatas])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    dispatch({ type: 'Next' })
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    dispatch({ type: 'Prev' })
  }

  return (
    <>
      <Grid
        item
        // component="article"
        // disableGutters
        sx={isHomePage ? sxTopContainerHomePage : null}
        // maxWidth={!isHomePage ? false : 'lg'}
        xs={12}
        xl={8}
        lg={8}
      >
        {isHomePage ? (
          <MobileStepper
            sx={{
              position: 'absolute',
              top: '15em',
              width: '100%',
              bgcolor: 'inherit',
              '.MuiMobileStepper-dots': {
                display: 'none',
              },
            }}
            variant="dots"
            steps={maxSteps ?? 0}
            position="static"
            nextButton={
              <Button
                sx={sxArrow}
                size="small"
                onClick={!isExist ? handleNext : null}
                disabled={isExist}
              >
                <KeyboardArrowRight sx={{ fontSize: '4em' }} />
              </Button>
            }
            backButton={
              <Button
                sx={sxArrow}
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft sx={{ fontSize: '4em' }} />
              </Button>
            }
          />
        ) : null}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginLeft: '1em',
            textShadow: `${theme.palette.background.topIcon} 1px 0 0`,
          }}
        >
          Top {type}
        </Typography>
        {status === LOADING ? (
          <ListCardsSkeleton
            dimension={{ height: '400px', width: '16em' }}
            nbCard={isHomePage ? 4 : 12}
            top={{ isUse: true, isHomePage: isHomePage }}
          />
        ) : null}
        {status === SUCCESS ? (
          <TopView
            isHomePage={isHomePage ? true : false}
            datas={isHomePage ? filteredTopDatas : topDatas?.Page?.media}
            type={type}
            rank={rank.minRank + 1}
          />
        ) : null}
      </Grid>
    </>
  )
}

export default TopDetails
