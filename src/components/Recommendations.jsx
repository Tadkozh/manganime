import { useParams, Link } from 'react-router-dom'
import '../styles/recommendations.css'
import {
  Button,
  Typography,
  Box,
  Card,
  CardMedia,
  // CardHeader,
  CardContent,
} from './ui'
import { useInfos } from '../hooks/queriesHooks'
import { useRecommendation } from '../hooks/queriesHooks'
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp'

// Components
import NavBarInfo from './NavBarInfo'
import { getUrl } from '../utils/helper'
import { INFOS } from '../commons/constants'

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

  // const titlehook = useInfos(type, id)
  // console.log('titlehook', titlehook)
  // const title = titlehook?.title
  // console.log('title', title)

  let directives = ''
  if (recommendations?.length === 0) {
    directives = `No recommendation about ${title}`
  } else {
    directives = (
      <>
        <Typography>
          <ArrowRightSharpIcon />
          Click on Read More to see the article on MyAnimeList
        </Typography>
        <Typography>
          <ArrowRightSharpIcon />
          Click on the image to see the card
        </Typography>
      </>
    )
  }

  return (
    <>
      <NavBarInfo />

      <main style={{ padding: '10px' }}>
        <Box sx={{ padding: '10px' }}>
          <Typography
            variant="h4"
            component="h2"
          >{`People who like ${title} also enjoy`}</Typography>
          {directives}

          <div className="datagrid">
            {recommendations
              ? recommendations.map((data, index) => {
                  if (index < 10) {
                    return (
                      <div key={index}>
                        {/* <p>{data.entry.title}</p>
                        <Link to={getUrl(type, INFOS, [data.entry.mal_id])}>
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
                        </p> */}

                        <Card sx={{ maxWidth: 225 }}>
                          {/* <CardHeader title={data.entry.title} /> */}
                          <Link to={getUrl(type, INFOS, [data.entry.mal_id])}>
                            <CardMedia
                              height={335}
                              component="img"
                              image={data.entry.images.jpg.image_url}
                              alt={data.entry.title}
                            />
                          </Link>
                          <CardContent sx={{ height: 140 }}>
                            <Typography
                              variant="h6"
                              component="h3"
                              sx={{ height: 64 }}
                            >
                              {data.entry.title}
                            </Typography>
                            <Box
                              sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                              <Button
                                sx={{ margin: 'auto 5px' }}
                                variant="contained"
                                href={data.entry.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Read more
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </div>
                    )
                  }
                  return null
                })
              : 'loading, please wait...'}
          </div>
        </Box>
      </main>
    </>
  )
}

export default Recommendations
