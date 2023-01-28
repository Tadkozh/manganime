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

  console.log('data infos', info)

  return info ? (
    <>
      <NavBarInfoTabs />
      <div className="info">
        <div className="header">
          <InfoPresentation info={info} />
          <InfoSynopsis synopsis={info.description} />
          <InfoDetails />
        </div>

        {type === ANIME ? <Trailer info={info.trailer} /> : null}

        <InfoForm info={info} />
        <InfoReviews />
      </div>
    </>
  ) : null
}

function Trailer({ info }) {
  return info ? (
    <>
      <Button
        href={`https://www.youtube.com/watch?v=${info.id}`}
        variant="contained"
        sx={{ m: '0 auto' }}
      >
        Watch trailer on {info.site}
      </Button>
      <iframe
        title="Trailer"
        src={`https://www.youtube.com/embed/${info.id}?autoplay=1&mute=1`}
        thumbnail={info.thumbnail}
        style={{ margin: '0 auto' }}
      />
    </>
  ) : null
}

export default Infos
