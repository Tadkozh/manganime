import { Box, Paper, Typography } from '../ui'
import { useTheme } from '@mui/material'

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

  return (
    <Paper sx={{ mx: 'auto', p: 2, width: '230px' }}>
      {details.map((item, index) => {
        if (details[index].data !== unknown) {
          return (
            <Box
              key={index + 'box'}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: '5px auto',
              }}
            >
              {item?.data ? (
                <>
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    key={index + 'details'}
                  >
                    {item.label}
                  </Typography>
                  {item.label === 'Studios' || item.label === 'Genres' ? (
                    item.data
                  ) : (
                    <Typography sx={{ color: theme.palette.text.secondary }}>
                      {item.data}
                    </Typography>
                  )}
                </>
              ) : null}
            </Box>
          )
        } else {
          return null
        }
      })}
    </Paper>
  )
}

export default InfoDetails
