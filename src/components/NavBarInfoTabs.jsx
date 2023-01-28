import * as React from 'react'
import { useState, useReducer } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { INFOS, STREAMING, RECOMMENDATIONS } from '../commons/constants'
import { Box, Tab, Tabs } from '../components/ui'
import { useInfos } from '../hooks/queriesHooks'
import { getUrl } from '../utils/helper'

export default function NavBarInfoTabs() {
  let { type, id } = useParams()
  const location = useLocation()

  const [value, setValue] = useState(location.pathname)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const data = useInfos(type, id)
  const info = data?.Page?.media[0]?.streamingEpisodes

  console.log('info navbar', info)

  const urlInfos = getUrl(type, INFOS, [id])
  const urlStreaming = getUrl(type, STREAMING, [id])
  const urlRecom = getUrl(type, RECOMMENDATIONS, [id])

  return (
    <Box sx={{ width: '100%', bgcolor: 'rgb(75, 75, 75)' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Infos" to={urlInfos} component={Link} value={urlInfos} />
        {info && info.length > 0 ? (
          <Tab
            label="Streaming"
            to={urlStreaming}
            component={Link}
            value={urlStreaming}
          />
        ) : null}
        <Tab
          label="Recommendations"
          to={urlRecom}
          component={Link}
          value={urlRecom}
        />
      </Tabs>
    </Box>
  )
}
