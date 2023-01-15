import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// CSS Files
import '../pageInfo.css'
import '../pageInfo450px.css'
import '../pageInfo600px.css'
import '../pageInfo800px.css'
import '../pageInfo1024px.css'

// Components
import NavBarInfo from '../navBarInfo'
import AnimePresentation from './animePresentation'
import Synopsis from '../synopsis'
import AnimeDetails from './animeDetails'
import Story from '../story'
import Form from '../form'
import Reviews from '../reviews'
import MangAnimeAppBar from '../../header/MangAnimeAppBar'

function AnimeMainInfo() {
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
      <MangAnimeAppBar />
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

export default AnimeMainInfo
