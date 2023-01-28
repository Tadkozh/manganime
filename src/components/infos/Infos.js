import { useParams } from 'react-router-dom'
import { Button } from '../ui'

// CSS Files
import './infos.css'
import './infosQueries.css'

// Constants
import { ANIME } from '../../commons/constants'

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
  const data = useInfos(type, id)
  const info = data?.Page?.media[0]

  // console.log('data infos', info)

  return info ? (
    <>
      <NavBarInfoTabs />
      <div className="infoWrapper">
        <>
          <div className="info">
            <div className="header">
              <InfoPresentation info={info} />
              <InfoSynopsis synopsis={info.description} />
              <InfoDetails />
            </div>

            {type === ANIME && info ? (
              <div className="watch">
                <Trailer info={info.trailer} />
              </div>
            ) : null}

            <InfoForm info={info} />
            <InfoReviews />
          </div>
        </>
      </div>
    </>
  ) : null
}

function Trailer({ info }) {
  return info ? (
    <div>
      <Button href={`https://www.youtube.com/watch?v=${info.id}`}>
        Watch trailer on {info.site}
      </Button>
      <iframe
        title="Trailer"
        src={`https://www.youtube.com/embed/${info.id}?autoplay=1&mute=1`}
        thumbnail={info.thumbnail}
      />
      {/* <Button href={`https://www.youtube.com/watch?v=${info.id}`}>
        Watch trailer on {info.site}
      </Button>
      <a href={`https://www.youtube.com/watch?v=${info.id}`}>
        <img id="trailer" alt="trailer" src={info.thumbnail} />
      </a> */}
    </div>
  ) : null
}

export default Infos
