import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// CSS Files
import '../pageInfo.css'
import '../pageInfoQueries.css'

// Components
import NavBarInfo from '../NavBarInfo'
import AnimePresentation from './AnimePresentation'
import Synopsis from '../Synopsis'
import Details from '../details'
import Story from '../Story'
import Form from '../Form'
import Reviews from '../Reviews'

function AnimeMain() {
  let { id } = useParams()

  const collectionType = 'anime' // collectionType : anime, manga

  const linkInfo = `https://api.jikan.moe/v4/anime/${id}/full`
  const [getInfo, setGetInfo] = useState(null)

  useEffect(() => {
    fetch(linkInfo)
      .then((res) => res.json())
      .then((data) => setGetInfo(data))
  }, [linkInfo])

  return (
    <>
      <NavBarInfo collectionType={collectionType} />
      <div className="infoWrapper">
        {getInfo?.data ? (
          <>
            <div className="info">
              <div className="header">
                <AnimePresentation getInfo={getInfo} />
                <Synopsis getInfo={getInfo} />

                {/* {getInfo?.data?.trailer?.embed_url ? (
                  <embed
                    id="trailer"
                    type="video/webm"
                    src={getInfo?.data?.trailer?.embed_url}
                  ></embed>
                ) : (
                  <p>No trailer was found.</p>
                )} */}

                <Details getInfo={getInfo} collectionType="anime" />
              </div>
              <Story getInfo={getInfo} />
              <Form />
              <Reviews id={id} />
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default AnimeMain
