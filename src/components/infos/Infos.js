import { useParams } from 'react-router-dom'

// CSS Files
import './infos.css'
import './infosQueries.css'

// Components
import { useInfos } from '../../hooks/queriesHooks'
import NavBarInfo from '../NavBarInfo'
import InfoDetails from './InfoDetails'
import InfoForm from './InfoForm'
import InfoPresentation from './InfoPresentation'
import InfoReviews from './InfoReviews'
import InfoStory from './InfoStory'
import InfoSynopsis from './InfoSynopsis'

function Infos() {
  let { type, id } = useParams()
  const info = useInfos(type, id)

  return (
    <>
      <NavBarInfo />
      <div className="infoWrapper">
        {info ? (
          <>
            <div className="info">
              <div className="header">
                <InfoPresentation info={info} />
                <InfoSynopsis synopsis={info.synopsis} />

                {/* {getInfo?.data?.trailer?.embed_url ? (
                  <embed
                    id="trailer"
                    type="video/webm"
                    src={getInfo?.data?.trailer?.embed_url}
                  ></embed>
                ) : (
                  <p>No trailer was found.</p>
                )} */}

                <InfoDetails info={info} />
              </div>
              <InfoStory background={info.background} />
              <InfoForm />
              <InfoReviews />
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default Infos
