import { useEffect, useState } from 'react'
import axios from 'axios'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Item from '@mui/material/Stack'
import Button from '@mui/material/Button'
import CustomizedAccordions from './NewsAccordion'

export const NewsAnime = () => {
  const [animeNews, setAnimeNews] = useState([])

  // https://api.jikan.moe/v4/anime/${id}/news
  //https://api.jikan.moe/v4/manga/{id}/news

  const APP_API_URL = 'https://api.jikan.moe/v4'
  const endpoint = 'news'
  const id = 190 // id : 1, 190 : No news Manga
  const params = 'anime' // params : anime, manga

  // const clientApi = (endpoint = null, params = {}) => {
  //   return axios
  //     .get(${url}/${params}/${endpoint})
  //     .then((data) => data)
  //     .catch((error) => error)
  // }

  const getDataFromApi = () => {
    axios
      .get(`${APP_API_URL}/${params}/${id}/${endpoint}`)
      .then((response) => {
        console.log(`${APP_API_URL}/${params}/${id}/${endpoint}`)
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
      <h2>News about this {params}</h2>
      <div>
        {animeNews
          ? animeNews.map((data, index) => {
              return (
                <div key={index} className="news">
                  <Accordion
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
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
                          <p>
                            <Button
                              variant="contained"
                              href={data.forum_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              See article
                            </Button>
                          </p>
                        </Item>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                </div>
              )
            })
          : 'No news...'}
      </div>
      <CustomizedAccordions />
    </>
  )
}
