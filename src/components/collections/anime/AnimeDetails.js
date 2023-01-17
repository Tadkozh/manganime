function AnimeDetails({ getInfo }) {
  const unknown = 'unknown'

  const details = [
    {
      label: 'Type',
      data:
        `${getInfo.data.type}` ?? unknown,
        doesDataExist: getInfo.data.type,
    },
    {
      label: 'Genre',
      data: getInfo.data.genres[0]?.name ?? unknown,
      doesDataExist: getInfo.data.genres[0]?.name,
    },
    {
      label: 'Themes',
      data: getInfo.data.themes[0]?.name ?? unknown,
      doesDataExist: getInfo.data.themes[0]?.name,
    },
    {
      label: 'Rating',
      data: getInfo.data?.rating ?? unknown,
      doesDataExist: getInfo.data?.rating,
    },
    {
      label: 'Status',
      data: getInfo.data?.status ?? unknown,
      doesDataExist: getInfo.data.status,
    },
    {
      label: 'Aired from',
      data: getInfo.data.aired.prop.from?.year ? `${
        getInfo.data.aired.prop.from?.day < 10
          ? `0${getInfo.data.aired.prop.from?.day}`
          : getInfo.data.aired.prop.from?.day
      }/${
        getInfo.data.aired.prop.from?.month < 10
          ? `0${getInfo.data.aired.prop.from?.month}`
          : getInfo.data.aired.prop.from?.month
      }/${getInfo.data.aired.prop.from?.year}`
      : unknown,
      doesDataExist: getInfo.data.aired.prop.from.year,
    },
    {
      label: 'Aired to',
      data: getInfo.data.aired.prop.to.year
        ? `${
            getInfo.data.aired.prop.to.day < 10
              ? `0${getInfo.data.aired.prop.to?.day}`
              : getInfo.data.aired.prop.to.day
          }/${
            getInfo.data.aired.prop.to.month < 10
              ? `0${getInfo.data.aired.prop.to?.month}`
              : getInfo.data.aired.prop.to.month
          }/${getInfo.data.aired.prop.to.year}`
        : 'Still active',
        doesDataExist: getInfo.data.aired.prop.to.year,
    },
    {
      label: 'Episodes',
      data: getInfo.data?.episodes ?? unknown,
      doesDataExist: getInfo.data.episodes,
    },
    {
      label: 'Duration',
      data: getInfo.data?.duration ?? unknown,
      doesDataExist: getInfo.data.duration,
    },
    {
      label: 'Studio',
      data: getInfo.data.studios[0]?.name ?? unknown,
      doesDataExist: getInfo.data.studios[0]?.name,
    },
    {
      label: 'Producers',
      data: getInfo.data.producers[0]?.name ?? unknown,
      doesDataExist: getInfo.data.producers[0]?.name,
    },
    {
      label: 'Licensors',
      data: getInfo.data.licensors[0]?.name ?? unknown,
      doesDataExist: getInfo.data.licensors[0]?.name,
    },
    {
      label: 'Rank',
      data: (getInfo.data?.rank && getInfo.data?.rank !== 0 ? getInfo.data?.rank : unknown),
      doesDataExist: getInfo.data.rank,
    },
    {
      label: 'Popularity',
      data: (getInfo.data?.popularity && getInfo.data?.popularity !== 0 ? getInfo.data?.popularity : unknown),
      doesDataExist: getInfo.data.popularity,
    },
    {
      label: 'Fanbase',
      data: (getInfo.data?.members && getInfo.data?.members !== 0 ? getInfo.data?.members : unknown),
      doesDataExist: getInfo.data.members,
    },
    {
      label: 'Source',
      data: getInfo.data?.source ?? unknown,
      doesDataExist: getInfo.data.source,
    },
  ]
  console.log("getInfo.data.type: " + getInfo.data.type)
  console.log("getInfo.data.bla: " + getInfo.data.bla)

  return (
    <>
      <div className="details">
        {details.map((data, index) => {
            if (details[index].doesDataExist !== undefined) {
            return <div key={index}>
              <div className="label">
                <p>{data?.label}:</p>
              </div>
              <div className="data">
                <p>{data?.data}</p>
              </div>
            </div>} else {
              return "null"
            }
        })}
      </div>
    </>
  )
}

export default AnimeDetails
