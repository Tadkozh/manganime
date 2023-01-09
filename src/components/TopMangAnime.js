import React from 'react'
import axios from 'axios'

const topAnimeApiUrl = 'https://api.jikan.moe/v4/top/anime'

const TopAnimeSearch = () => {
  const [topAnimeDatas, setTopAnimeDatas] = React.useState([])
  const [searchTop, setSearchTop] = React.useState(false)

  const getTopAnimeDatas = () => {
    axios
      .get(topAnimeApiUrl)
      .then((response) => {
        setTopAnimeDatas(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  React.useEffect(() => {
    if (searchTop) {
      getTopAnimeDatas()
    }
    return () => {
      setSearchTop(false)
    }
  })

  return (
    <>
      <article>
        <h2>Top Anime</h2>
        <button
          onClick={(e) => {
            setSearchTop(true)
          }}
          value="Search"
        >
          Search
        </button>
        <TopAnimeList datas={topAnimeDatas} />
      </article>
    </>
  )
}

const TopAnimeList = ({ datas }) => {
  return (
    <ul>
      {datas.map((map, index) => {
        return <li key={index}>{map.title}</li>
      })}
    </ul>
  )
}

export { TopAnimeSearch }
