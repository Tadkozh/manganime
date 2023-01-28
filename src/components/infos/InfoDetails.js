import { useParams } from 'react-router-dom'
import { useDetails } from '../../hooks/queriesHooks'

function InfoDetails() {
  let { type, id } = useParams()

  const data = useDetails(type, id)
  const info = data.Page.media[0]

  const unknown = 'unknown'

  const typeData = info?.type
  let genresData = Object.keys(info?.genres)
    .map((data) => {
      return `${info?.genres[data]}`
    })
    .join(', ')
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
  let studiosData = Object.keys(info?.studios?.nodes)
    .map((data) => {
      return `${info?.studios?.nodes[data]?.name}`
    })
    .join(', ')
  const isLicensedData = info?.isLicensed
  const sourceData = info?.source

  const details = [
    {
      label: 'Type',
      data: typeData ?? unknown,
      doesDataExist: typeData,
    },
    {
      label: 'Genres',
      data: genresData ?? unknown,
      doesDataExist: genresData,
    },
    // {
    //   label: 'Rank',
    //   data: rankData && rankData !== 0 ? rankData : unknown,
    //   doesDataExist: rankData,
    // },
    {
      label: 'Popularity',
      data: popularityData && popularityData !== 0 ? popularityData : unknown,
      doesDataExist: popularityData,
    },
    // {
    //   label: 'Fanbase',
    //   data: favouritesData && favouritesData !== 0 ? favouritesData : unknown,
    //   doesDataExist: favouritesData,
    // },
    {
      label: 'Status',
      data: statusData ?? unknown,
      doesDataExist: statusData,
    },
    {
      label: 'Aired from',
      data: startDateYearData ? startDateData : unknown,
      doesDataExist: startDateData,
    },
    {
      label: 'Aired to',
      data: endDateYearData ? endDateData : unknown,
      doesDataExist: endDateData,
    },
    {
      label: 'Episodes',
      data: episodesData ?? unknown,
      doesDataExist: episodesData,
    },
    {
      label: 'Volumes',
      data: volumesData ?? unknown,
      doesDataExist: volumesData,
    },
    {
      label: 'Chapters',
      data: chaptersData ?? unknown,
      doesDataExist: chaptersData,
    },
    {
      label: 'Duration',
      data: `≈ ${durationData} minutes` ?? unknown,
      doesDataExist: durationData,
    },
    {
      label: 'Studios',
      data: studiosData ?? unknown,
      doesDataExist: studiosData,
    },
    // {
    //   label: 'Producers',
    //   data: producersData ?? unknown,
    //   doesDataExist: producersData,
    // },
    {
      label: 'Is licensed',
      data: isLicensedData ? 'Yes' : 'No',
      doesDataExist: isLicensedData,
    },
    {
      label: 'Source',
      data: sourceData ?? unknown,
      doesDataExist: sourceData,
    },
  ]

  return (
    <>
      <div className="details">
        {details.map((data, index) => {
          if (details[index].data !== unknown) {
            return (
              <div key={index}>
                <div className="label">
                  <p>{data?.label}:</p>
                </div>
                <div className="data">
                  <p>{data?.data}</p>
                </div>
              </div>
            )
          } else {
            return null
          }
        })}
      </div>
    </>
  )
}

export default InfoDetails
