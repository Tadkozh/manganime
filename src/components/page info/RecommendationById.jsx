import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import '../../styles/common-css.css'
import Button from '@mui/material/Button'

const RecommendationById = () => {
  // const RecommendationById = () => {
  let { id } = useParams()

  const [animeRecom, setAnimeRecom] = useState([])

  // https://api.jikan.moe/v4/anime/${id}/recommendations
  //https://api.jikan.moe/v4/manga/{id}/recommendations

  const APP_API_URL = 'https://api.jikan.moe/v4'
  const endpoint = 'recommendations'
  // const id = 1 // id : 1, 100, 190
  const params = 'anime' // params : anime, manga

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

  let directives = ''
  if (animeRecom.length === 0) {
    directives = `No recommendation about this ${params}`
  } else {
    directives = ''
  }

  return (
    <>
      <h2>{`People who like this ${params} also enjoy`}</h2>
      <p>{directives}</p>
      <div className="datagrid">
        {animeRecom
          ? animeRecom.map((data, index) => {
              if (index < 10) {
                return (
                  <div key={index}>
                    <p>{data.entry.title}</p>
                    <Link to={`/infosManga/main/${data.entry.mal_id}`}>
                      <img src={data.entry.images.jpg.image_url} alt="" />
                    </Link>
                    <p>
                      <Button
                        variant="contained"
                        href={data.entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read more
                      </Button>
                    </p>
                  </div>
                )
              }
              return null
            })
          : 'loading...'}
      </div>
    </>
  )
}
export default RecommendationById
