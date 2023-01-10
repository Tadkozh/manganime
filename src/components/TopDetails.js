import React from 'react'
import useGetTopDatas from '../hooks/getTopDatas'
import SearchTop from './SearchTop'
import TopView from './TopView'

const TopDetails = ({ name }) => {
  const topAnimesApiUrl = 'https://api.jikan.moe/v4/top/anime'
  const topMangasApiUrl = 'https://api.jikan.moe/v4/top/manga'
  let url = ''
  const [isSubmitted, setisSubmitted] = React.useState(false)
  const [topDatas, setTopDatas] = React.useState([])

  if (name === 'Animes') {
    url = topAnimesApiUrl
  } else if (name === 'Mangas') {
    url = topMangasApiUrl
  } else {
    throw new Error('Invalid name')
  }

  useGetTopDatas(isSubmitted, url, setTopDatas, setisSubmitted)

  return (
    <>
      <article>
        <h2>Top {name}</h2>
        <SearchTop name={name} handleSubmit={(e) => setisSubmitted(true)} />
        <TopView datas={topDatas} />
      </article>
    </>
  )
}

export default TopDetails
