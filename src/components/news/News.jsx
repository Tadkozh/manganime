import { useParams } from 'react-router-dom'
import { useInfos, useNews } from '../../hooks/queriesHooks'
import { Typography, Box } from '../ui'
import { NewsAccordion } from './NewsAccordion'
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp'

// Components
import NavBarInfo from '../NavBarInfo'
import NavBarInfoTabs from '../NavBarInfoTabs'

const News = () => {
  let { type, id } = useParams()

  const { data: news, status } = useNews(type, id)
  console.log('news', news)
  console.log('status', status)

  const { data: titlehook } = useInfos(type, id)
  console.log('titlehook', titlehook)
  const title = titlehook?.title
  console.log('title', title)

  let directives = ''
  if (news?.length === 0) {
    directives = `No news about this ${type} currently`
  } else {
    directives = `Click on a news title to learn more`
  }

  return (
    <>
      {/* <NavBarInfo /> */}

      <NavBarInfoTabs />
      <main style={{ padding: '10px' }}>
        <Box sx={{ padding: '10px' }}>
          <Typography variant="h4" component="h2">
            Some news about <i>{title}</i>
          </Typography>

          <Typography sx={{ marginBottom: 5 }}>
            <ArrowRightSharpIcon />
            {directives}
          </Typography>
          {news
            ? news.map((data, index) => {
                if (index < 10) {
                  return (
                    <div key={index}>
                      <NewsAccordion data={data} />
                    </div>
                  )
                }
                return null
              })
            : 'loading, please wait...'}
        </Box>
      </main>
    </>
  )
}

export default News
