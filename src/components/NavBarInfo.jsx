import * as React from 'react'
import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { INFOS, STREAMING, RECOMMENDATIONS } from '../commons/constants'
import { Box, Tab, Tabs } from './ui'
import { useStreaming, useRecommendations } from '../hooks/queriesHooks'
import { getUrl } from '../utils/helper'
import { useTheme } from '@mui/material'

export default function NavBarInfo() {
  let { type, id } = useParams()
  const location = useLocation()
  const theme = useTheme()

  const [value, setValue] = useState(location.pathname)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const dataStreaming = useStreaming(type, id)
  const infoStreaming = dataStreaming?.Page?.media[0]?.streamingEpisodes
  const dataRecommendations = useRecommendations(type, id)

  const urlInfos = getUrl([type, INFOS, id])
  const urlStreaming = getUrl([type, STREAMING, id])
  const urlRecom = getUrl([type, RECOMMENDATIONS, id])

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label="Infos"
          to={urlInfos}
          component={Link}
          value={urlInfos}
          sx={{ color: theme.palette.text.primary }}
        />

        {infoStreaming && infoStreaming.length > 0 ? (
          <Tab
            label="Streaming"
            to={urlStreaming}
            component={Link}
            value={urlStreaming}
            sx={{ color: theme.palette.text.primary }}
          />
        ) : null}

        {dataRecommendations?.Page?.recommendations.length > 0 ? (
          <Tab
            label="Recommendations"
            to={urlRecom}
            component={Link}
            value={urlRecom}
            sx={{ color: theme.palette.text.primary }}
          />
        ) : null}
      </Tabs>
    </Box>
  )
}
