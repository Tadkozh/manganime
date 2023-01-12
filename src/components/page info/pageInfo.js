import { useEffect, useState } from 'react'

// CSS Files
import './pageInfo.css'
import './pageInfo450px.css'
import './pageInfo600px.css'
import './pageInfo800px.css'
import './pageInfo1024px.css'

// Libraries
// import axios from 'axios'

// Components
import InfoHeader from './infoHeader'
import Synopsis from './synopsis'
import MiscellaneousInfos from './miscellaneousInfos'
import BackgroundStory from './backgroundStory'
import FormInfo from './formInfo'
import Comments from './comments'

function PageInfo() {
  const linkInfo = `https://api.jikan.moe/v4/anime/1/full`
  const [getInfo, setGetInfo] = useState(null)

  //   useEffect(() => {
  //     axios.get(linkInfo).then((data) => setGetInfo(data))
  //   }, [linkInfo])

  useEffect(() => {
    fetch(linkInfo)
      .then((res) => res.json())
      .then((data) => setGetInfo(data))
  }, [linkInfo])

  return (
    <>
      <div className="infoWrapper">
        {getInfo?.data ? (
          <>
            <div className="info">
              <div className="infoRow1">
                <InfoHeader getInfo={getInfo} />
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

                <MiscellaneousInfos getInfo={getInfo} />
              </div>

              <BackgroundStory getInfo={getInfo} />
              <div className="news">Espace news (FRANCK)</div>
              <FormInfo />
              <Comments />
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default PageInfo
