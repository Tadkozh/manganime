import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// CSS Files
import '../pageInfo.css'
import '../pageInfo450px.css'
import '../pageInfo600px.css'
import '../pageInfo800px.css'
import '../pageInfo1024px.css'

// Components
import NavBarInfo from '../NavBarInfo'
import AnimePresentation from './AnimePresentation'
import Synopsis from '../Synopsis'
import AnimeDetails from './AnimeDetails'
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
              <div className="infoRow1">
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

                <AnimeDetails getInfo={getInfo} />
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
