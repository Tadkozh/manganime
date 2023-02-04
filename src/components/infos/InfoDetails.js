import { Box, Paper, Typography } from '../ui'
import { Button, useTheme } from '@mui/material'
import { useState } from 'react'

function InfoDetails({ info }) {
  const theme = useTheme()
  const unknown = 'unknown'

  const { startDate, endDate } = info

  const typeData = info?.type
  let genresData = info
    ? Object.keys(info?.genres).map((data, index) => {
        return (
          <Typography
            key={index + 'genres'}
            sx={{ color: theme.palette.text.secondary }}
          >
            {info?.genres[data]}
          </Typography>
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
          <Typography
            key={index + 'studio'}
            sx={{ color: theme.palette.text.secondary }}
          >
            {info?.studios?.nodes[data]?.name}
          </Typography>
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

  return (
    <>
      <DetailledInfosBtn
        seeDetails={seeDetails}
        setSeeDetails={setSeeDetails}
      />

      <Paper
        sx={{
          display: { xs: seeDetails ? 'grid' : 'none', md: 'block' },
          gridTemplateColumns: 'repeat(auto-fit, 200px)',
          gridTemplateRows: 'repeat(auto-fit, auto)',
          justifyContent: 'center',
          position: 'sticky',
          top: '100px',
          width: { xs: 'auto', md: '230px' },
          maxHeight: { md: '80vh' },
          textAlign: 'center',
          p: 2,
          mx: { xs: 2, md: 'auto' },
          overflowY: { md: 'scroll' },
          // border: 'solid red',
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
                  // border: 'solid blue',
                  width: '100%',
                }}
              >
                {item?.data && (
                  <>
                    <Typography key={index + 'details'}>
                      {item.label}
                    </Typography>

                    <Typography sx={{ color: theme.palette.text.secondary }}>
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
