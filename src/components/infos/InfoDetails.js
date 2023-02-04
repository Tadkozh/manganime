import { Box, Paper, Typography } from '../ui'
import { Button, useTheme } from '@mui/material'
import { useState, useEffect } from 'react'

function InfoDetails({ info }) {
  const theme = useTheme()
  const unknown = 'unknown'

  const { startDate, endDate } = info

  const typeData = info?.type
  let genresData = info
    ? Object.keys(info?.genres).map((data, index) => {
        return (
          <Box component="span" key={'wrapper' + index}>
            <Box
              component="span"
              key={index + 'genres'}
              sx={{ color: theme.palette.text.secondary }}
            >
              {info?.genres[data]}
            </Box>
            <br />
          </Box>
        )
      })
    : null
  // const rankData = info?.rankings[0]?.rank
  const popularityData = info?.popularity.toLocaleString()
  const statusData = info?.status
  const startDateYearData = startDate?.year
  const startDateData = `${
    startDate?.day
      ? startDate?.day < 10
        ? `0${startDate?.day}/`
        : `${startDate?.day}/`
      : ''
  }${
    startDate?.month
      ? startDate?.month < 10
        ? `0${startDate?.month}/`
        : `${startDate?.month}/`
      : ''
  }${startDate?.year ? startDate?.year : ''}`

  const endDateYearData = endDate?.year
  const endDateData = `${
    endDate?.day
      ? endDate?.day < 10
        ? `0${endDate?.day}/`
        : `${endDate?.day}/`
      : ''
  }${
    endDate?.month
      ? endDate?.month < 10
        ? `0${endDate?.month}/`
        : `${endDate?.month}/`
      : ''
  }${endDate?.year ? endDate?.year : ''}`
  const episodesData = info?.episodes
  const volumesData = info?.volumes
  const chaptersData = info?.chapters
  const durationData = info?.duration
  let studiosData = info
    ? Object.keys(info?.studios?.nodes).map((data, index) => {
        return (
          <Box component="span" key={'wrapper' + index}>
            <Box
              component="span"
              key={index + 'studio'}
              sx={{ color: theme.palette.text.secondary }}
            >
              {info?.studios?.nodes[data]?.name}
            </Box>
            <br />
          </Box>
        )
      })
    : null
  const isLicensedData = info?.isLicensed
  const sourceData = info?.source

  const details = [
    {
      label: 'Type',
      data: typeData ?? unknown,
    },
    {
      label: 'Genres',
      data: genresData ?? unknown,
    },
    // {
    //   label: 'Rank',
    //   data: rankData && rankData !== 0 ? rankData : unknown,
    // },
    {
      label: 'Popularity',
      data: popularityData && popularityData !== 0 ? popularityData : unknown,
    },
    // {
    //   label: 'Fanbase',
    //   data: favouritesData && favouritesData !== 0 ? favouritesData : unknown,
    // },
    {
      label: 'Status',
      data: statusData ?? unknown,
    },
    {
      label: 'Aired from',
      data: startDateYearData ? startDateData : unknown,
    },
    {
      label: 'Aired to',
      data: endDateYearData ? endDateData : unknown,
    },
    {
      label: 'Episodes',
      data: episodesData ?? unknown,
    },
    {
      label: 'Volumes',
      data: volumesData ?? unknown,
    },
    {
      label: 'Chapters',
      data: chaptersData ?? unknown,
    },
    {
      label: 'Duration',
      data: ` ${durationData} minutes` ?? unknown,
    },
    {
      label: 'Studios',
      data: studiosData ?? unknown,
    },
    // {
    //   label: 'Producers',
    //   data: producersData ?? unknown,
    // },
    {
      label: 'Is licensed',
      data: isLicensedData ? 'Yes' : 'No',
    },
    {
      label: 'Source',
      data: sourceData ?? unknown,
    },
  ]

  const [seeDetails, setSeeDetails] = useState(false)

  const [detailsHeight, setDetailsHeight] = useState(0)
  const screenHeight = window.innerHeight

  useEffect(() => {
    const el = document.getElementById('stickyDetails')

    setDetailsHeight(el.offsetHeight)
  }, [])

  return (
    <>
      <DetailledInfosBtn
        seeDetails={seeDetails}
        setSeeDetails={setSeeDetails}
      />

      <Paper
        id="stickyDetails"
        sx={{
          display: { xs: seeDetails ? 'grid' : 'none', md: 'block' },
          gridTemplateColumns: 'repeat(auto-fit, 200px)',
          justifyContent: 'center',
          position: { xs: 'block', md: 'sticky' },
          top: `calc(${
            detailsHeight -
            screenHeight -
            (detailsHeight - screenHeight) * 2 -
            10
          }px)`,
          width: { xs: 'auto', md: '230px' },
          textAlign: 'center',
          p: 2,
          mx: { xs: 2, md: 'auto' },
        }}
      >
        {details.map((item, index) => {
          if (details[index].data !== unknown) {
            return (
              <Box
                key={index + 'box'}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '5px auto',
                  width: '100%',
                }}
              >
                {item?.data && (
                  <>
                    <Typography key={'label' + index}>{item.label}</Typography>

                    <Typography
                      key={'details' + index}
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {item.data}
                    </Typography>
                  </>
                )}
              </Box>
            )
          } else {
            return null
          }
        })}
      </Paper>
    </>
  )
}

function DetailledInfosBtn({ seeDetails, setSeeDetails }) {
  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Button
        variant="contained"
        onClick={() => setSeeDetails(!seeDetails)}
        sx={{ m: '10px auto' }}
      >
        {seeDetails ? 'Hide' : 'See'} detailled infos
      </Button>
    </Box>
  )
}

export default InfoDetails
