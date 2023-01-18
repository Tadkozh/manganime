import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// CSS Files
import './pageInfo.css'
import './pageInfoQueries.css'

// Components
import NavBarInfo from './NavBarInfo'
import Presentation from './Presentation'
import Synopsis from './Synopsis'
import Details from './Details'
import Story from './Story'
import Form from './Form'
import Reviews from './Reviews'

import { APP_API_URL } from '../../commons/constants'

function Main() {
  let { collectionType, id } = useParams()

  const linkInfo = `${APP_API_URL}/${collectionType}/${id}/full`
  const [getInfo, setGetInfo] = useState(null)

  useEffect(() => {
    fetch(linkInfo)
      .then((res) => res.json())
      .then((data) => setGetInfo(data))
  }, [linkInfo])

  return (
    <>
      <NavBarInfo />
      <div className="infoWrapper">
        {getInfo?.data ? (
          <>
            <div className="info">
              <div className="header">
                <Presentation getInfo={getInfo} />
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

                <Details getInfo={getInfo} />
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
