import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AccordionBasic } from './AccordionBasic'

// Components
import NavBarInfo from './NavBarInfo'

const News = () => {
  let { id, title } = useParams()

  const [news, setNews] = useState([])

  //https://api.jikan.moe/v4/anime/${id}/news
  //https://api.jikan.moe/v4/manga/{id}/news

  const APP_API_URL = 'https://api.jikan.moe/v4'
  const endpoint = 'news'
  // const id = 1 // id : 1, 190 : No news Manga
  const collectionType = 'anime' // collectionType : anime, manga

  // const clientApi = (endpoint = null, collectionType = {}) => {
  //   return axios
  //     .get(${url}/${collectionType}/${endpoint})
  //     .then((data) => data)
  //     .catch((error) => error)
  // }

  const getDataFromApi = () => {
    axios
      .get(`${APP_API_URL}/${collectionType}/${id}/${endpoint}`)
      .then((response) => {
        console.log(`${APP_API_URL}/${collectionType}/${id}/${endpoint}`)
        console.log(response.data.data)
        setNews(response.data.data)
      })
      .catch((error) => error)
  }

  useEffect(() => {
    getDataFromApi()
  }, [])

  let directives = ''
  if (news.length === 0) {
    directives = `No news about this ${collectionType}`
  } else {
    directives = `Click on a title to learn more`
  }

  return (
    <>
      <NavBarInfo />
      <h2>News about {title}</h2>
      <p>{directives}</p>
      {news
        ? news.map((data, index) => {
            if (index < 10) {
              return (
                <div key={index}>
                  <AccordionBasic data={data} />
                </div>
              )
            }
            return null
          })
        : 'loading...'}
    </>
  )
}

export default News