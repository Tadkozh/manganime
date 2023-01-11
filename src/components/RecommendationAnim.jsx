import { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/common-css.css'

export const RecommendationAnim = () => {
  const [animeRecom, setAnimeRecom] = useState([])

  // https://api.jikan.moe/v4/anime/${id}/recommendations
  //https://api.jikan.moe/v4/manga/{id}/recommendations

  const APP_API_URL = 'https://api.jikan.moe/v4'
  const endpoint = 'recommendations'
  const id = 190 // id : 1, 100, 190
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
        console.log(response.data.data)
        setAnimeRecom(response.data.data)
      })
      .catch((error) => error)
  }

  useEffect(() => {
    getDataFromApi()
  }, [])

  return (
    <>
      <h2>{`People who like this ${params} also enjoy`}</h2>
      <div className="datagrid">
        {animeRecom
          ? animeRecom.map((data, index) => {
              return (
                <div key={index}>
                  <p>{data.entry.title}</p>
                  <img src={data.entry.images.jpg.image_url} alt="" />
                  <p>
                    <a href={data.entry.url}>Read more</a>
                    <a
                      href={data.entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more
                    </a>
                  </p>
                </div>
              )
            })
          : 'No recommendation...'}
      </div>
    </>
  )
}