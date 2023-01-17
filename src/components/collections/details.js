function Details({ getInfo, collectionType }) {
  const unknown = 'unknown'

  const details = [
    {
      label: 'Type',
      data: `${getInfo.data.type}` ?? unknown,
      doesDataExist: getInfo.data.type,
    },
    {
      label: 'Genres',
      data: getInfo.data?.genres[0]?.name ?? unknown,
      doesDataExist: getInfo.data?.genres[0]?.name,
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
      label: 'Rank',
      data:
        getInfo.data?.rank && getInfo.data?.rank !== 0
          ? getInfo.data?.rank
          : unknown,
      doesDataExist: getInfo.data.rank,
    },
    {
      label: 'Popularity',
      data:
        getInfo.data?.popularity && getInfo.data?.popularity !== 0
          ? getInfo.data?.popularity
          : unknown,
      doesDataExist: getInfo.data.popularity,
    },
    {
      label: 'Fanbase',
      data:
        getInfo.data?.members && getInfo.data.members !== 0
          ? getInfo.data.members
          : unknown,
      doesDataExist: getInfo.data.members,
    },
    {
      label: 'Status',
      data: getInfo.data?.status ?? unknown,
      doesDataExist: getInfo.data.status,
    },
    {
      label: 'Aired from',
      data: getInfo.data.aired?.prop?.from?.year
        ? `${
            getInfo.data.aired?.prop?.from?.day < 10
              ? `0${getInfo.data.aired?.prop?.from?.day}`
              : getInfo.data.aired?.prop?.from?.day
          }/${
            getInfo.data.aired?.prop?.from?.month < 10
              ? `0${getInfo.data.aired?.prop?.from?.month}`
              : getInfo.data.aired?.prop?.from?.month
          }/${getInfo.data.aired?.prop?.from?.year}`
        : unknown,
      doesDataExist: getInfo.data.aired?.prop?.from.year,
    },
    {
      label: 'Aired to',
      data: getInfo.data.aired?.prop?.to.year
        ? `${
            getInfo.data.aired?.prop?.to.day < 10
              ? `0${getInfo.data.aired.prop?.to?.day}`
              : getInfo.data.aired.prop?.to.day
          }/${
            getInfo.data.aired?.prop?.to.month < 10
              ? `0${getInfo.data.aired?.prop?.to?.month}`
              : getInfo.data.aired?.prop?.to.month
          }/${getInfo.data.aired?.prop?.to.year}`
        : 'Still active',
      doesDataExist: getInfo.data.aired?.prop?.to.year,
    },
    {
      label: 'Published from',
      data: getInfo.data.published?.prop?.from?.year
        ? `${
            getInfo.data.published?.prop?.from?.day < 10
              ? `0${getInfo.data.published?.prop?.from?.day}`
              : getInfo.data.published?.prop?.from?.day
          }/${
            getInfo.data.published?.prop?.from?.month < 10
              ? `0${getInfo.data.published?.prop?.from?.month}`
              : getInfo.data.published?.prop?.from?.month
          }/${getInfo.data.published?.prop.from.year}`
        : unknown,
      doesDataExist: getInfo.data.published?.prop?.from?.year,
    },
    {
      label: 'Published to',
      data: getInfo.data.published?.prop?.to.year
        ? `${
            getInfo.data.published?.prop?.to.day < 10
              ? `0${getInfo.data.published?.prop?.to?.day}`
              : getInfo.data.published?.prop?.to.day
          }/${
            getInfo.data.published?.prop?.to.month < 10
              ? `0${getInfo.data.published?.prop?.to?.month}`
              : getInfo.data.published?.prop?.to.month
          }/${getInfo.data.published?.prop?.to.year}`
        : 'Still active',
      doesDataExist: getInfo.data.published?.prop?.to.year,
    },
    {
      label: 'Episodes',
      data: getInfo.data?.episodes ?? unknown,
      doesDataExist: getInfo.data.episodes,
    },
    {
      label: 'Volumes',
      data: getInfo.data?.volumes ?? unknown,
      doesDataExist: getInfo.data?.volumes,
    },
    {
      label: 'Chapters',
      data: getInfo.data?.chapters ?? unknown,
      doesDataExist: getInfo.data?.chapters,
    },
    {
      label: 'Duration',
      data: getInfo.data?.duration ?? unknown,
      doesDataExist: getInfo.data.duration,
    },
    collectionType === 'anime'
      ? {
          label: 'Studios',
          data: getInfo?.data?.studios[0]?.name ?? unknown,
          doesDataExist: getInfo?.data?.studios[0]?.name,
        }
      : 'badType',
    collectionType === 'anime'
      ? {
          label: 'Producers',
          data: getInfo.data.producers[0]?.name ?? unknown,
          doesDataExist: getInfo.data.producers[0]?.name,
        }
      : 'badType',
    collectionType === 'anime'
      ? {
          label: 'Licensors',
          data: getInfo.data.licensors[0]?.name ?? unknown,
          doesDataExist: getInfo.data.licensors[0]?.name,
        }
      : 'badType',
    collectionType === 'manga'
      ? {
          label: 'Author',
          data: getInfo?.data?.authors[0]?.name ?? unknown,
          doesDataExist: getInfo?.data?.authors[0]?.name,
        }
      : 'badType',
    collectionType === 'manga'
      ? {
          label: 'Serializations',
          data: getInfo.data?.serializations[0]?.name ?? unknown,
          doesDataExist: getInfo.data?.serializations[0]?.name,
        }
      : 'badType',
    {
      label: 'Demographics',
      data: getInfo.data.demographics[0]?.name ?? unknown,
      doesDataExist: getInfo.data.demographics[0]?.name,
    },
    {
      label: 'Source',
      data: getInfo.data.source ?? unknown,
      doesDataExist: getInfo.data.source,
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
