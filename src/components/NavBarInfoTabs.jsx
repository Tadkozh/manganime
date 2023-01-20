import * as React from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { INFOS, NEWS, RECOMMENDATIONS } from '../commons/constants'
import { getUrl } from '../utils/helper'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export default function NavBarInfoTabs() {
  let { type, id } = useParams()

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'rgb(75, 75, 75)' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Infos" component={Link} to={getUrl(type, INFOS, [id])} />
        <Tab label="News" component={Link} to={getUrl(type, NEWS, [id])} />
        <Tab
          label="Recommendations"
          component={Link}
          to={getUrl(type, RECOMMENDATIONS, [id])}
        />
      </Tabs>
    </Box>
  )
}
