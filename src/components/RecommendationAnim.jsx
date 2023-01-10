import { useEffect, useState } from 'react'
import axios from 'axios'

export const RecommendationAnim = () => {
  const [animeRecom, setAnimeRecom] = useState([])

  const id = 190

  const getDataFromApi = () => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
      .then((response) => {
        console.log(response.data.data)
        setAnimeRecom(response.data.data)
      })
  }

  useEffect(() => {
    getDataFromApi()
  }, [])

  return (
    <>
      <h2>People who like this anime also enjoy</h2>
      <div className="hey">
        {animeRecom
          ? animeRecom.map((data, index) => {
              return (
                <div key={index}>
                  <p>{data.entry.title}</p>
                  <img
                    src={data.entry.images.webp.small_image_url}
                    alt=""
                    target="_blank"
                  />
                  <p>
                    <a href={data.entry.url}>Read more</a>
                  </p>

                  {/* <img src={data.images.jpg.image_url} alt="" target="_blank" />
                  <span>Excerpt: {data.excerpt}</span>
                  <a href={data.forum_url}>See article</a> */}
                </div>
              )
            })
          : 'No recommendation...'}
      </div>
    </>
  )
}
