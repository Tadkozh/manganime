import { useParams } from 'react-router-dom'
import { useRecommendations } from '../../hooks/queriesHooks'
import './recommendations.css'
import { ArrowRightSharp, Box, Typography } from './../ui'
import { useTheme } from '@mui/material'

// Components
import NavBarInfoTabs from './../NavBarInfoTabs'
import RecommendationsCard from './RecommendationsCard'

const Recommendations = () => {
  let { type, id } = useParams()
  const theme = useTheme()

  const data = useRecommendations(type, id)
  console.log('data recommendations', data)
  const info = data?.Page?.recommendations
  console.log('info', info)

  let directives = ''
  if (info?.length === 0) {
    directives = `No recommendations.`
  } else {
    directives = (
      <>
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
          People who like this also enjoy
        </Typography>
        {directives}

        <div className="grid-recommendations">
          {data
            ? data?.Page?.recommendations.map((data, index) => {
                if (index < 12) {
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
