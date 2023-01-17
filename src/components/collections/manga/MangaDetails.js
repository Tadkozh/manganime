function MangaDetails({ getInfo }) {
  const unknown = 'unknown'

  const details = [
    {
      label: 'Type',
      data: `${getInfo.data.type}` ?? unknown,
    },
    {
      label: 'Genre',
      data: getInfo.data.genres[0]?.name ?? unknown,
    },
    {
      label: 'Themes',
      data: getInfo.data.themes[0]?.name ?? unknown,
    },
    {
      label: 'Status',
      data: getInfo.data?.status ?? unknown,
    },
    {
      label: 'Published from',
      data: getInfo.data.published.prop.from?.year ? `${
        getInfo.data.published.prop.from?.day < 10
          ? `0${getInfo.data.published.prop.from?.day}`
          : getInfo.data.published.prop.from?.day
      }/${
        getInfo.data.published.prop.from?.month < 10
          ? `0${getInfo.data.published.prop.from?.month}`
          : getInfo.data.published.prop.from?.month
      }/${getInfo.data.published.prop.from?.year}`
      : unknown
    },
    {
      label: 'Published to',
      data: getInfo.data.published.prop.to.year
        ? `${
            getInfo.data.published.prop.to.day < 10
              ? `0${getInfo.data.published.prop.to?.day}`
              : getInfo.data.published.prop.to.day
          }/${
            getInfo.data.published.prop.to.month < 10
              ? `0${getInfo.data.published.prop.to?.month}`
              : getInfo.data.published.prop.to.month
          }/${getInfo.data.published.prop.to.year}`
        : 'Still active',
    },
    {
      label: 'Volumes',
      data: getInfo.data?.volumes ?? unknown,
    },
    {
      label: 'Chapters',
      data: getInfo.data?.chapters ?? unknown,
    },
    {
      label: 'Author',
      data: getInfo.data.authors[0]?.name ?? unknown,
    },
    {
      label: 'Serializations',
      data: getInfo.data.serializations[0]?.name ?? unknown,
    },
    {
      label: 'Genres',
      data: getInfo.data.genres[0]?.name ?? unknown,
    },
    {
      label: 'Rank',
      data: (getInfo.data?.rank && getInfo.data?.rank !== 0 ? getInfo.data?.rank : unknown),
    },
    {
      label: 'Popularity',
      data: (getInfo.data?.popularity && getInfo.data?.popularity !== 0 ? getInfo.data?.popularity : unknown),
    },
    {
      label: 'Demographics',
      data: getInfo.data.demographics[0]?.name ?? unknown,
    },
  ]

  return (
    <>
      <div className="details">
        {details.map((data, index) => {
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
        })}
      </div>
    </>
  )
}

export default MangaDetails
