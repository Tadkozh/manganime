import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// CSS Files
import './pageInfo.css'
import './pageInfoQueries.css'

// Components
import NavBarInfo from './NavBarInfo'
import Presentation from './Presentation'
import Synopsis from './Synopsis'
import Details from './details'
import Story from './Story'
import Form from './Form'
import Reviews from './Reviews'

function Main() {
  let { collectionType, id } = useParams()
  console.log('collectionType: ' + collectionType)
  console.log('id: ' + id)

  // const collectionType = 'anime' // collectionType : anime, manga

  const linkInfo = `https://api.jikan.moe/v4/${collectionType}/${id}/full`
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
                <Presentation
                  getInfo={getInfo}
                  collectionType={collectionType}
                />
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

                <Details getInfo={getInfo} collectionType={collectionType} />
              </div>
              <Story getInfo={getInfo} />
              <Form />
              <Reviews />
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default Main
