import { useEffect, useState } from 'react'
import axios from 'axios'
import { AccordionBasic } from './AccordionBasic'

// const NewsById = ({ id }) => {
const NewsById = () => {
  const [animeNews, setAnimeNews] = useState([])

  //https://api.jikan.moe/v4/anime/${id}/news
  //https://api.jikan.moe/v4/manga/{id}/news

  const APP_API_URL = 'https://api.jikan.moe/v4'
  const endpoint = 'news'
  const id = 1 // id : 1, 190 : No news Manga
  const params = 'manga' // params : anime, manga

  // const clientApi = (endpoint = null, params = {}) => {
  //   return axios
  //     .get(${url}/${params}/${endpoint})
  //     .then((data) => data)
  //     .catch((error) => error)
  // }

  const getDataFromApi = () => {
    axios
      .get(`${APP_API_URL}/${params}/${id}/${endpoint}`)
      .then((response) => {
        console.log(`${APP_API_URL}/${params}/${id}/${endpoint}`)
        console.log(response.data.data)
        setAnimeNews(response.data.data)
      })
      .catch((error) => error)
  }

  useEffect(() => {
    getDataFromApi()
  }, [])

  let directives = ''
  if (animeNews.length === 0) {
    directives = `No news about this ${params}`
  } else {
    directives = 'Click on a title to learn more'
  }

  return (
    <>
      <h2>News about this {params}</h2>
      <p>{directives}</p>

      {animeNews
        ? animeNews.map((data, index) => {
            if (index < 10) {
              return (
                <div key={index}>
                  <AccordionBasic data={data} />
                </div>
              )
            }
          })
        : null}
    </>
  )
}
export default NewsById
