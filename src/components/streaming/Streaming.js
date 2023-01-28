import { useParams } from 'react-router-dom'
import { useInfos } from '../../hooks/queriesHooks'

import './streaming.css'

import NavBarInfoTabs from '../NavBarInfoTabs'
import { Button, useTheme } from '@mui/material'

function Streaming() {
  let { type, id } = useParams()
  const theme = useTheme()

  const data = useInfos(type, id)
  const info = data?.Page?.media[0]?.streamingEpisodes

  // sx={{color: theme.palette.text.primary}}

  return info && info.length > 0 ? (
    <>
      <NavBarInfoTabs />
      <div className="streaming">
        <h2>Watch streaming on {info[0]?.site}</h2>
        <div className="datagrid">
          {info.map((data, index) => {
            return (
              <div key={index}>
                <a href={data.url} target="_blank" rel="noreferrer">
                  <h3>{data.title}</h3>
                  <div className="imgWrapper">
                    <img id="trailer" alt="trailer" src={data.thumbnail} />
                  </div>
                  <Button variant="contained">Watch on {data.site}</Button>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </>
  ) : (
    <>
      <NavBarInfoTabs />
      <p>bruh</p>
    </>
  )
}

export default Streaming
