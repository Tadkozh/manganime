import { useParams } from 'react-router-dom'

function Details({ getInfo }) {
  let { collectionType } = useParams()

  const unknown = 'unknown'

  const isAnime = collectionType === 'anime'
  const isManga = collectionType === 'manga'

  const typeData = getInfo?.data?.type
  const genresData = getInfo?.data?.genres[0]?.name
  const themesData = getInfo?.data?.themes[0]?.name
  const ratingData = getInfo?.data?.rating
  const rankData = getInfo?.data?.rank
  const popularityData = getInfo?.data?.popularity
  const membersData = getInfo?.data?.members
  const statusData = getInfo?.data?.status
  const airedFromYearData = getInfo?.data?.aired?.prop?.from?.year
  const airedFromData = `${
    getInfo?.data?.aired?.prop?.from?.day < 10
      ? `0${getInfo?.data?.aired?.prop?.from?.day}`
      : getInfo?.data?.aired?.prop?.from?.day
  }/${
    getInfo?.data?.aired?.prop?.from?.month < 10
      ? `0${getInfo?.data?.aired?.prop?.from?.month}`
      : getInfo?.data?.aired?.prop?.from?.month
  }/${getInfo?.data?.aired?.prop?.from?.year}`

  const airedToYearData = getInfo?.data?.aired?.prop?.to?.year
  const airedToData = `${
    getInfo?.data?.aired?.prop?.to?.day < 10
      ? `0${getInfo?.data?.aired?.prop?.to?.day}`
      : getInfo?.data?.aired?.prop?.to.day
  }/${
    getInfo?.data?.aired?.prop?.to?.month < 10
      ? `0${getInfo?.data?.aired?.prop?.to?.month}`
      : getInfo?.data?.aired?.prop?.to?.month
  }/${getInfo?.data?.aired?.prop?.to?.year}`
  const publishedFromYearData = getInfo?.data?.published?.prop?.from?.year
  const publishedFromData = `${
    getInfo?.data?.published?.prop?.from?.day < 10
      ? `0${getInfo?.data?.published?.prop?.from?.day}`
      : getInfo?.data?.published?.prop?.from?.day
  }/${
    getInfo?.data?.published?.prop?.from?.month < 10
      ? `0${getInfo?.data?.published?.prop?.from?.month}`
      : getInfo?.data?.published?.prop?.from?.month
  }/${getInfo?.data?.published?.prop?.from?.year}`
  const publishedToYearData = getInfo?.data?.published?.prop?.to?.year
  const publishedToData = `${
    getInfo?.data?.published?.prop?.to?.day < 10
      ? `0${getInfo?.data?.published?.prop?.to?.day}`
      : getInfo?.data?.published?.prop?.to?.day
  }/${
    getInfo?.data?.published?.prop?.to.month < 10
      ? `0${getInfo?.data?.published?.prop?.to?.month}`
      : getInfo?.data?.published?.prop?.to?.month
  }/${getInfo?.data?.published?.prop?.to?.year}`
  const episodesData = getInfo?.data?.episodes
  const volumesData = getInfo?.data?.volumes
  const chaptersData = getInfo?.data?.chapters
  const durationData = getInfo?.data?.duration
  const studiosData = isAnime ? getInfo?.data?.studios[0]?.name : null
  const producersData = isAnime ? getInfo?.data?.producers[0]?.name : null
  const licensorsData = isAnime ? getInfo?.data?.licensors[0]?.name : null
  const authorsData = isManga ? getInfo?.data?.authors[0]?.name : null
  const serializationsData = isManga
    ? getInfo.data?.serializations[0]?.name
    : null
  const demographicsData = getInfo?.data?.demographics[0]?.name
  const sourceData = getInfo?.data?.source

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
