import { useEffect, useState } from 'react'
import axios from 'axios'
import '../commons/common-css.css'

export const RecommendationAnim = () => {
  const [animeRecom, setAnimeRecom] = useState([])

  // id : 1, 100, 190
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
      <div className="datagrid">
        {animeRecom
          ? animeRecom.map((data, index) => {
              return (
                <div key={index}>
                  <p>{data.entry.title}</p>
                  <img src={data.entry.images.jpg.image_url} alt="" />
                  <p>
                    <a href={data.entry.url}>Read more</a>
                    <a
                      href={data.entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more
                    </a>
                  </p>
                </div>
              )
            })
          : 'No recommendation...'}
      </div>
    </>
  )
}
