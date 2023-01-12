function MiscellaneousInfos({ getInfo }) {
  const unknown = 'unknown'

  const miscellaneousInfos = [
    {
      label: 'Type',
      data: getInfo.data.producers[0]?.type ?? unknown,
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
      label: 'Rating',
      data: getInfo.data?.rating ?? unknown,
    },
    {
      label: 'Status',
      data: getInfo.data?.status ?? unknown,
    },
    {
      label: 'Aired from',
      data: `${
        getInfo.data.aired.prop.from?.day < 10
          ? `0${getInfo.data.aired.prop.from?.day}`
          : getInfo.data.aired.prop.from?.day
      }/${
        getInfo.data.aired.prop.from?.month < 10
          ? `0${getInfo.data.aired.prop.from?.month}`
          : getInfo.data.aired.prop.from?.month
      }/${getInfo.data.aired.prop.from?.year}`,
    },
    {
      label: 'Aired to',
      data: `${
        getInfo.data.aired.prop.to?.day < 10
          ? `0${getInfo.data.aired.prop.to?.day}`
          : getInfo.data.aired.prop.to?.day
      }/${
        getInfo.data.aired.prop.to?.month < 10
          ? `0${getInfo.data.aired.prop.to?.month}`
          : getInfo.data.aired.prop.to?.month
      }/${getInfo.data.aired.prop.to?.year}`,
    },
    {
      label: 'Episodes',
      data: getInfo.data?.episodes ?? unknown,
    },
    {
      label: 'Duration',
      data: getInfo.data?.duration ?? unknown,
    },
    {
      label: 'Studio',
      data: getInfo.data.studios[0]?.name ?? unknown,
    },
    {
      label: 'Producers',
      data: getInfo.data.producers[0]?.name ?? unknown,
    },
    {
      label: 'Licensors',
      data: getInfo.data.licensors[0]?.name ?? unknown,
    },
    {
      label: 'Rank',
      data: getInfo.data?.rank ?? unknown,
    },
    {
      label: 'Popularity',
      data: getInfo.data?.popularity ?? unknown,
    },
    {
      label: 'Fanbase',
      data: getInfo.data?.members ?? unknown,
    },
    {
      label: 'Source',
      data: getInfo.data?.source ?? unknown,
    },
  ]

  return (
    <>
      <div className="miscellaneousInfos">
        {/* <p>Caractéristiques:</p> */}
        {miscellaneousInfos.map((data, index) => {
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

export default MiscellaneousInfos
