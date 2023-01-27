import * as React from 'react'
import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { INFOS, RECOMMENDATIONS } from '../commons/constants'
import { Box, Tab, Tabs } from '../components/ui'
import { getUrl } from '../utils/helper'

export default function NavBarInfoTabs() {
  let { type, id } = useParams()
  const location = useLocation()

  const [value, setValue] = useState(location.pathname)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  
  const urlInfos = getUrl(type, INFOS, [id])
  // const urlNews = getUrl(type, NEWS, [id])
  const urlRecom = getUrl(type, RECOMMENDATIONS, [id])

  return (
    <Box sx={{ width: '100%', bgcolor: 'rgb(75, 75, 75)' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Infos" to={urlInfos} component={Link} value={urlInfos} />
        {/* <Tab label="News" to={urlNews} component={Link} value={urlNews} /> */}
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
