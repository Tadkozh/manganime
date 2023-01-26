import { useParams } from 'react-router-dom'
import { useDetails } from '../../hooks/queriesHooks'

function InfoDetails() {
  let { type, id } = useParams()

  const data = useDetails(type, id)
  const info = data.Page.media[0]

  console.log('startDate?.year', info?.startDate?.year)
  console.log('startDate?.day', info?.startDate?.day)
  console.log('typeData', info?.type)
  console.log('favourites', info?.favourites)
  console.log('popularity', info?.popularity)
  console.log('isLicensed', info?.isLicensed)

  const unknown = 'unknown'

  // const isAnime = type === ANIME
  // const isManga = type === MANGA

  const typeData = info?.type
  let genresData = Object.keys(info?.genres)
    .map((data) => {
      return `${info?.genres[data]}`
    })
    .join(', ')
  const meanScoreData = info?.meanScore
  const rankData = info?.rankings?.rank
  const popularityData = info?.popularity
  const favouritesData = info?.favourites
  const statusData = info?.status
  const startDateYearData = info?.startDate?.year
  const startDateData = `${
    info?.startDate?.day < 10
      ? `0${info?.startDate?.day}`
      : info?.startDate?.day
  }/${
    info?.startDate?.month < 10
      ? `0${info?.startDate?.month}`
      : info?.startDate?.month
  }/${info?.startDate?.year}`

  const endDateYearData = info?.endDate?.year
  const endDateData = `${
    info?.endDate?.day < 10 ? `0${info?.endDate?.day}` : info?.endDate?.day
  }/${
    info?.endDate?.month < 10
      ? `0${info?.endDate?.month}`
      : info?.endDate?.month
  }/${info?.endDate?.year}`
  const episodesData = info?.episodes
  const volumesData = info?.volumes
  const chaptersData = info?.chapters
  const durationData = info?.duration
  // const studiosData = isAnime ? info?.studios[0]?.name : null
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
    {
      label: 'Rating',
      data: meanScoreData ?? unknown,
      doesDataExist: meanScoreData,
    },
    {
      label: 'Rank',
      data: rankData && rankData !== 0 ? rankData : unknown,
      doesDataExist: rankData,
    },
    {
      label: 'Popularity',
      data: popularityData && popularityData !== 0 ? popularityData : unknown,
      doesDataExist: popularityData,
    },
    {
      label: 'Fanbase',
      data: favouritesData && favouritesData !== 0 ? favouritesData : unknown,
      doesDataExist: favouritesData,
    },
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
      data: endDateYearData ? endDateData : 'Still active',
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
      data: durationData ?? unknown,
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
          // if (details[index].doesDataExist !== undefined) {
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
          // } else {
          //   return null
          // }
        })}
      </div>
    </>
  )
}

export default InfoDetails
