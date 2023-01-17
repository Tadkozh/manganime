import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import '../../styles/recommendations.css'
import {
  Button,
  // Typography
} from '..'
import { useRecommendation } from '../../hooks/queriesHooks'
import { APP_API_URL } from '../../commons/constants'

// Components
import NavBarInfo from './NavBarInfo'

const Recommendations = () => {
  let { collectionType, id, title } = useParams()

  const [animeRecom, setAnimeRecom] = useState([])

  const endpoint = 'recommendations'

  const getDataFromApi = useCallback(() => {
    axios
      .get(`${APP_API_URL}/${collectionType}/${id}/${endpoint}`)
      .then((response) => {
        setAnimeRecom(response.data.data)
      })
      .catch((error) => error)
  }, [id])

  useEffect(() => {
    getDataFromApi()
  }, [getDataFromApi])

  let directives = ''
  if (animeRecom.length === 0) {
    directives = `No recommendation about ${title}`
  } else {
    directives =
      'Click on Read More to see the article on MyAnimeList | Click on the image to see the card'
  }

  return (
    <>
      <NavBarInfo colecType={collectionType} />

      {/* <Typography variant="h2" component="h2">{`People who like ${title} also enjoy`}</Typography>
      <Typography>{directives}</Typography> */}

      <h2>{`People who like ${title} also enjoy`}</h2>
      <p>{directives}</p>

      <div className="datagrid">
        {animeRecom
          ? animeRecom.map((data, index) => {
              if (index < 10) {
                return (
                  <div key={index}>
                    <p>{data.entry.title}</p>
                    <Link
                      to={`/collection/${collectionType}/search/main/${data.entry.mal_id}/${data.entry.title}`}
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
