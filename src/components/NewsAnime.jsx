import { useEffect, useState } from 'react'
import axios from 'axios'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export const NewsAnime = () => {
  const [animeNews, setAnimeNews] = useState([])

  const id = 190

  const getDataFromApi = () => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}/news`).then((response) => {
      console.log(response.data.data)
      setAnimeNews(response.data.data)
    })
  }

  useEffect(() => {
    getDataFromApi()
  }, [])

  return (
    <>
      <h2>News Accordion</h2>
      <div className="hey">
        {animeNews
          ? animeNews.map((data, index) => {
              return (
                <div key={index} className="news">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{data.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <img
                          src={data.images.jpg.image_url}
                          alt=""
                          target="_blank"
                        />
                        <span>excerpt: {data.excerpt}</span>
                        <a href={data.forum_url}>See article</a>
                      </Typography>
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
