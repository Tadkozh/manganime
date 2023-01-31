import { Box, Typography } from '@mui/material'

function InfoDetails({ info }) {
  const unknown = 'unknown'

  const typeData = info?.type
  let genresData = info
    ? Object.keys(info?.genres)
        .map((data) => {
          return `${info?.genres[data]}`
        })
        .join(', ')
    : null
  // const rankData = info?.rankings[0]?.rank
  const popularityData = info?.popularity.toLocaleString()
  const statusData = info?.status
  const startDateYearData = info?.startDate?.year
  const startDateData = `${
    info?.startDate?.day
      ? info?.startDate?.day < 10
        ? `0${info?.startDate?.day}/`
        : `${info?.startDate?.day}/`
      : ''
  }${
    info?.startDate?.month
      ? info?.startDate?.month < 10
        ? `0${info?.startDate?.month}/`
        : `${info?.startDate?.month}/`
      : ''
  }${info?.startDate?.year ? info?.startDate?.year : ''}`

  const endDateYearData = info?.endDate?.year
  const endDateData = `${
    info?.endDate?.day
      ? info?.endDate?.day < 10
        ? `0${info?.endDate?.day}/`
        : `${info?.endDate?.day}/`
      : ''
  }${
    info?.endDate?.month
      ? info?.endDate?.month < 10
        ? `0${info?.endDate?.month}/`
        : `${info?.endDate?.month}/`
      : ''
  }${info?.endDate?.year ? info?.endDate?.year : ''}`
  const episodesData = info?.episodes
  const volumesData = info?.volumes
  const chaptersData = info?.chapters
  const durationData = info?.duration
  let studiosData = info
    ? Object.keys(info?.studios?.nodes)
        .map((data) => {
          return `${info?.studios?.nodes[data]?.name}`
        })
        .join(', ')
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
      data: `≈ ${durationData} minutes` ?? unknown,
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
    <>
      {details.map((data, index) => {
        if (details[index].data !== unknown) {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                margin: '5px auto',
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '50%',
                  backgroundColor: 'rgba(128, 128, 128, 0.5)',
                  padding: '5px 10px',
                }}
              >
                {data?.label}:
              </Typography>
              <Typography
                sx={{
                  width: '50%',
                  backgroundColor: 'rgba(128, 128, 128, 0.75)',
                  padding: '5px',
                }}
              >
                {data?.data}
              </Typography>
            </Box>
          )
        } else {
          return null
        }
      })}
    </>
  )
}

export default InfoDetails
