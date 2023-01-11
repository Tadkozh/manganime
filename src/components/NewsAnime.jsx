import { useEffect, useState } from 'react'
import axios from 'axios'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Item from '@mui/material/Stack'
// import Box from '@mui/material/Stack'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export const NewsAnime = () => {
  const [animeNews, setAnimeNews] = useState([])

  // id : 1, 100, 190
  const id = 190

  // const clientApi = (endpoint = null, params = {}) => {
  //   return axios
  //     .get(${url}/${params}/${endpoint})
  //     .then((data) => data)
  //     .catch((error) => error)
  // }

  const getDataFromApi = () => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}/news`)
      .then((response) => {
        console.log(response.data.data)
        setAnimeNews(response.data.data)
      })
      .catch((error) => error)
  }

  useEffect(() => {
    getDataFromApi()
  }, [])

  return (
    <>
      <h2>News about this Anime</h2>
      <p>(click on a title to learn more)</p>
      <div>
        {animeNews
          ? animeNews.map((data, index) => {
              return (
                <div key={index} className="news">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{
                        background: 'silver',
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                        }}
                      >
                        {data.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        flexWrap="wrap"
                        spacing={2}
                      >
                        <Item sx={{ width: 300, textAlign: 'center' }}>
                          <img
                            src={data.images.jpg.image_url}
                            alt=""
                            target="_blank"
                          />
                        </Item>
                        <Item sx={{ maxWidth: 300, textAlign: 'center' }}>
                          <span>Excerpt: {data.excerpt}</span>
                          <a
                            href={data.forum_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            See article
                          </a>
                        </Item>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                </div>
              )
            })
          : 'No news...'}
      </div>
    </>
  )
}
