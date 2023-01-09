import { useEffect, useState } from 'react'
import axios from 'axios'

export const NewsAnime = () => {
  const [animeNews, setAnimeNews] = useState([])

  const id = 16143

  const getDataFromApi = () => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}/news`).then((response) => {
      console.log(response.data)
      setAnimeNews(response.data)
    })
  }

  useEffect(() => {
    getDataFromApi()
  }, [])

  return (
    <>
      <h1>Anime News</h1>
      <div>
        {animeNews
          ? animeNews.map((animeNew) => (
              <animeNew key={animeNew.mal_id} animeNew={animeNew} />
            ))
          : 'Loading...'}
      </div>
    </>
  )
}

// https://api.jikan.moe/v4/anime/{id}/news

// {
//   "pagination": {
//     "last_visible_page": 0,
//     "has_next_page": true
//   },
//   "data": [
//     {
//       "mal_id": 0,
//       "url": "string",
//       "title": "string",
//       "date": "string",
//       "author_username": "string",
//       "author_url": "string",
//       "forum_url": "string",
//       "images": {
//         "jpg": {
//           "image_url": "string"
//         }
//       },
//       "comments": 0,
//       "excerpt": "string"
//     }
//   ]
// }
