import { useParams } from 'react-router-dom'
import { useRecommendations } from '../../hooks/queriesHooks'
import './recommendations.css'
import { ArrowRightSharp, Box, Typography } from './../ui'

// Components
import NavBarInfoTabs from './../NavBarInfoTabs'
import RecommendationsCard from './RecommendationsCard'

const Recommendations = () => {
  let { type, id } = useParams()

  const data = useRecommendations(
    type,
    id,
  )
  console.log('data recommendations', data)

  const title = data?.Page?.media?.title?.english ?? "A REVOIR!!!"

  let directives = ''
  if (data?.length === 0) {
    directives = `No recommendations about ${title}`
  } else {
    directives = (
      <>
        <Typography
          sx={{
            display: 'flex',
            alignItem: 'center',
          }}
        >
          <ArrowRightSharp />
          Click on Read More to see the article on MyAnimeList
        </Typography>

        <Typography
          sx={{
            marginBottom: 5,
            display: 'flex',
            alignItem: 'center',
          }}
        >
          <ArrowRightSharp />
          Click on the image to see the card
        </Typography>
      </>
    )
  }

  return (
    <>
      {/* <NavBarInfoTabs /> */}

      <Box sx={{ padding: 6 }}>
        <Typography variant="h4" component="h2">
          People who like <i>{title}</i> also enjoy
        </Typography>
        {directives}

        <div className="datagrid">
          {data
            ? data?.Page?.recommendations.map((data, index) => {
                if (index < 15) {
                  return (
                    <div key={index}>
                      <RecommendationsCard data={data.media} />
                    </div>
                  )
                }
                return null
              })
            : 'loading, please wait...'}
        </div>
      </Box>
    </>
  )
}

export default Recommendations
