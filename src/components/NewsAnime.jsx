import { useEffect, useState } from 'react'
import axios from 'axios'

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
      <h2>News</h2>
      <div className="hey">
        {animeNews
          ? animeNews.map((data, index) => {
              return (
                <div key={index} className="news">
                  <p>{data.title}</p>
                  <img src={data.images.jpg.image_url} alt="" target="_blank" />
                  <p>excerpt: {data.excerpt}</p>
                  <a href={data.forum_url}>See article</a>
                </div>
              )
            })
          : 'No news...'}
      </div>
    </>
  )
}

// {getNews?.data ? (
//   <div className="hey">
//   {getNews.data.map((data, index) => {
//     return (
//       <div key={index} className="news">
//       <p>{data.title}</p>
//       {/* <img /> */}
//       <p>excerpt: {data.excerpt}</p>
//       <a href={data.author_url}>author_url</a>
//       <a href={data.forum_url}>forum_url</a>
//       </div>)})}</div>) : null}

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
