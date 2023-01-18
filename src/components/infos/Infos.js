import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// CSS Files
import './pageInfo.css'
import './pageInfoQueries.css'

// Components
import NavBarInfo from './NavBarInfo'
import Presentation from './Presentation'
import Synopsis from './Synopsis'
import Details from '../collections/details'
import Story from './Story'
import Form from './Form'
import Reviews from './Reviews'
import { useInfos } from '../../hooks/queriesHooks'

function Main() {
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
                <Presentation info={info} />
                <Synopsis synopsis={info.synopsis} />

                {/* {getInfo?.data?.trailer?.embed_url ? (
                  <embed
                    id="trailer"
                    type="video/webm"
                    src={getInfo?.data?.trailer?.embed_url}
                  ></embed>
                ) : (
                  <p>No trailer was found.</p>
                )} */}

                <Details info={info} />
              </div>
              <Story background={info.background} />
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
