import { useParams } from 'react-router-dom'
import { useInfos, useRecommendation } from '../../hooks/queriesHooks'
import './recommendations.css'
import { ArrowRightSharp, Box, Typography } from './../ui'

// Components
import NavBarInfoTabs from './../NavBarInfoTabs'
import RecommendationsCard from './RecommendationsCard'

const Recommendations = () => {
  let { type, id } = useParams()

  const { data: recommendations, status: statusRecom } = useRecommendation(
    type,
    id,
  )
  console.log('recommendations', recommendations)
  console.log('statusRecom', statusRecom)

  const { data: titlehook, status: statusTitle } = useInfos(type, id)
  console.log('titlehook', titlehook)
  console.log('statusTitle', statusTitle)
  const title = titlehook?.title

  let directives = ''
  if (recommendations?.length === 0) {
    directives = `No recommendation about ${title}`
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
      <NavBarInfoTabs />

      <Box sx={{ padding: 6 }}>
        <Typography variant="h4" component="h2">
          People who like <i>{title}</i> also enjoy
        </Typography>
        {directives}

        <div className="datagrid">
          {recommendations
            ? recommendations.map((data, index) => {
                if (index < 12) {
                  return (
                    <div key={index}>
                      <RecommendationsCard data={data} />
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
