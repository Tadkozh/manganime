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
import InfoSynopsis from './InfoSynopsis'

function Infos() {
  let { type, id } = useParams()
  const info = useInfos(type, id)

  return (
    <>
      <NavBarInfoTabs />
      <div className="infoWrapper">
        {info ? (
          <>
            <div className="info">
              <div className="header">
                <InfoPresentation info={info.Page.media[0]} />
                <InfoSynopsis synopsis={info.Page.media[0].description} />

                <InfoDetails />
              </div>
              {info.Page.media[0].trailer ? (
                <img
                  id="trailer"
                  alt="trailer"
                  src={info.Page.media[0].trailer.thumbnail}
                />
              ) : null}
              <InfoForm info={info} />
              {/* <InfoReviews /> */}
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default Infos
