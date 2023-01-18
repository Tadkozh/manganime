import { useParams } from 'react-router-dom'
import { ANIME, MANGA } from '../../commons/constants'

function Details({ info }) {
  let { collectionType } = useParams()

  const unknown = 'unknown'

  const isAnime = collectionType === ANIME
  const isManga = collectionType === MANGA

  const typeData = info?.type
  const genresData = info?.genres[0]?.name
  const themesData = info?.themes[0]?.name
  const ratingData = info?.rating
  const rankData = info?.rank
  const popularityData = info?.popularity
  const membersData = info?.members
  const statusData = info?.status
  const airedFromYearData = info?.aired?.prop?.from?.year
  const airedFromData = `${
    info?.aired?.prop?.from?.day < 10
      ? `0${info?.aired?.prop?.from?.day}`
      : info?.aired?.prop?.from?.day
  }/${
    info?.aired?.prop?.from?.month < 10
      ? `0${info?.aired?.prop?.from?.month}`
      : info?.aired?.prop?.from?.month
  }/${info?.aired?.prop?.from?.year}`

  const airedToYearData = info?.aired?.prop?.to?.year
  const airedToData = `${
    info?.aired?.prop?.to?.day < 10
      ? `0${info?.aired?.prop?.to?.day}`
      : info?.aired?.prop?.to.day
  }/${
    info?.aired?.prop?.to?.month < 10
      ? `0${info?.aired?.prop?.to?.month}`
      : info?.aired?.prop?.to?.month
  }/${info?.aired?.prop?.to?.year}`
  const publishedFromYearData = info?.published?.prop?.from?.year
  const publishedFromData = `${
    info?.published?.prop?.from?.day < 10
      ? `0${info?.published?.prop?.from?.day}`
      : info?.published?.prop?.from?.day
  }/${
    info?.published?.prop?.from?.month < 10
      ? `0${info?.published?.prop?.from?.month}`
      : info?.published?.prop?.from?.month
  }/${info?.published?.prop?.from?.year}`
  const publishedToYearData = info?.published?.prop?.to?.year
  const publishedToData = `${
    info?.published?.prop?.to?.day < 10
      ? `0${info?.published?.prop?.to?.day}`
      : info?.published?.prop?.to?.day
  }/${
    info?.published?.prop?.to.month < 10
      ? `0${info?.published?.prop?.to?.month}`
      : info?.published?.prop?.to?.month
  }/${info?.published?.prop?.to?.year}`
  const episodesData = info?.episodes
  const volumesData = info?.volumes
  const chaptersData = info?.chapters
  const durationData = info?.duration
  const studiosData = isAnime ? info?.studios[0]?.name : null
  const producersData = isAnime ? info?.producers[0]?.name : null
  const licensorsData = isAnime ? info?.licensors[0]?.name : null
  const authorsData = isManga ? info?.authors[0]?.name : null
  const serializationsData = isManga ? info?.serializations[0]?.name : null
  const demographicsData = info?.demographics[0]?.name
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
      label: 'Themes',
      data: themesData ?? unknown,
      doesDataExist: themesData,
    },
    {
      label: 'Rating',
      data: ratingData ?? unknown,
      doesDataExist: ratingData,
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
      data: membersData && membersData !== 0 ? membersData : unknown,
      doesDataExist: membersData,
    },
    {
      label: 'Status',
      data: statusData ?? unknown,
      doesDataExist: statusData,
    },
    {
      label: 'Aired from',
      data: airedFromYearData ? airedFromData : unknown,
      doesDataExist: airedFromYearData,
    },
    {
      label: 'Aired to',
      data: airedToYearData ? airedToData : 'Still active',
      doesDataExist: airedToYearData,
    },
    {
      label: 'Published from',
      data: publishedFromYearData ? publishedFromData : unknown,
      doesDataExist: publishedFromYearData,
    },
    {
      label: 'Published to',
      data: publishedToYearData ? publishedToData : 'Still active',
      doesDataExist: publishedToYearData,
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
    {
      label: 'Producers',
      data: producersData ?? unknown,
      doesDataExist: producersData,
    },
    {
      label: 'Licensors',
      data: licensorsData ?? unknown,
      doesDataExist: licensorsData,
    },
    {
      label: 'Author',
      data: authorsData ?? unknown,
      doesDataExist: authorsData,
    },
    {
      label: 'Serializations',
      data: serializationsData ?? unknown,
      doesDataExist: serializationsData,
    },
    {
      label: 'Demographics',
      data: demographicsData ?? unknown,
      doesDataExist: demographicsData,
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
          if (details[index].doesDataExist !== undefined) {
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

export default Details
