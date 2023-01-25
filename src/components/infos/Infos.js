import { useParams } from 'react-router-dom'

// CSS Files
import './infos.css'
import './infosQueries.css'

// Components
import { useInfos } from '../../hooks/queriesHooks'
import NavBarInfoTabs from '../NavBarInfoTabs'
import InfoDetails from './InfoDetails'
import InfoForm from './InfoForm'
import InfoPresentation from './InfoPresentation'
import InfoReviews from './InfoReviews'
import InfoStory from './InfoStory'
import InfoSynopsis from './InfoSynopsis'

function Infos() {
  let { type, id } = useParams()
  const info = useInfos(type, id)

  console.log('data', info)
  console.log('title', info?.Page?.media[0]?.title?.romaji)

  return (
    <>
      <NavBarInfoTabs />
      <div className="infoWrapper">
        {info ? (
          <>
            <div className="info">
              <div className="header">
                <InfoPresentation info={info.Page.media[0]} />
                {/* <InfoSynopsis synopsis={info.synopsis} /> */}

                {/* {getInfo?.data?.trailer?.embed_url ? (
                  <embed
                    id="trailer"
                    type="video/webm"
                    src={getInfo?.data?.trailer?.embed_url}
                  ></embed>
                ) : (
                  <p>No trailer was found.</p>
                )} */}

                {/* <InfoDetails info={info.Page.media[0]} /> */}
              </div>
              {/* <InfoStory background={info.Page.media[0]} /> */}
              <InfoForm />
              {/* <InfoReviews /> */}
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default Infos
