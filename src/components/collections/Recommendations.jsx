import { useParams, Link } from 'react-router-dom'
import '../../styles/recommendations.css'
import {
  Button,
  // Typography
} from '..'
import { useInfos } from '../../hooks/queriesHooks'
import { useRecommendation } from '../../hooks/queriesHooks'

// Components
import NavBarInfo from './NavBarInfo'

const Recommendations = () => {
  let { collectionType, id } = useParams()

  const { data: animeRecom, status } = useRecommendation(collectionType, id)
  console.log('animeRecom', animeRecom)
  console.log('status', status)
  
  const titlehook = useInfos(collectionType, id)
  console.log('titlehook', titlehook)
  const title = titlehook?.title
  console.log('title', title)

  let directives = ''
  if (animeRecom?.length === 0) {
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
