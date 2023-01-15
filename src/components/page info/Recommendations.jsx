import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import '../../styles/common-css.css'
import Button from '@mui/material/Button'

// Components
import NavBarInfo from './navBarInfo'
import MangAnimeAppBar from '../header/MangAnimeAppBar'

const Recommendations = () => {
  let { id } = useParams()

  const [animeRecom, setAnimeRecom] = useState([])

  // https://api.jikan.moe/v4/anime/${id}/recommendations
  //https://api.jikan.moe/v4/manga/{id}/recommendations

  const APP_API_URL = 'https://api.jikan.moe/v4'
  const endpoint = 'recommendations'
  // const id = 1 // id : 1, 100, 190
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
    directives = `No recommendation about this ${collectionType}`
  } else {
    directives = ''
  }

  return (
    <>
      <MangAnimeAppBar />
      <NavBarInfo collectionType={collectionType} />
      <h2>{`People who like this ${collectionType} also enjoy`}</h2>
      <p>{directives}</p>
      <div className="datagrid">
        {animeRecom
          ? animeRecom.map((data, index) => {
              if (index < 10) {
                return (
                  <div key={index}>
                    <p>{data.entry.mal_id}</p>
                    <p>{data.entry.title}</p>
                    <Link
                      to={`/collection/${collectionType}/search/main/${data.entry.mal_id}`}
                    >
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

export default Recommendations
