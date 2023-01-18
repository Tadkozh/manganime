import { useParams } from 'react-router-dom'
import { AccordionBasic } from './AccordionBasic'
import { useInfos } from '../../hooks/queriesHooks'
import { useNews } from '../../hooks/queriesHooks'
// import { Typography } from '..'

// Components
import NavBarInfo from './NavBarInfo'

const News = () => {
  let { type, id } = useParams()

  const { data: news, status } = useNews(type, id)
  console.log('news', news)
  console.log('status', status)

  const titlehook = useInfos(type, id)
  console.log('titlehook', titlehook)
  const title = titlehook?.title
  console.log('title', title)

  let directives = ''
  if (news?.length === 0) {
    directives = `No news about this ${type}`
  } else {
    directives = `Click on a title to learn more`
  }

  return (
    <>
      <NavBarInfo />
      {/* <Typography variant="h2" component="h2">News about {title}</Typography>
      <Typography>{directives}</Typography> */}

      <h2>News about {title}</h2>
      <p>{directives}</p>
      {news
        ? news.map((data, index) => {
            if (index < 10) {
              return (
                <div key={index}>
                  <AccordionBasic data={data} />
                </div>
              )
            }
            return null
          })
        : 'loading...'}
    </>
  )
}

export default News
