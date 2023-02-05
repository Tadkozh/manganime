import { Paper, Tab, Tabs, useTheme } from '@mui/material'
import React from 'react'
import { PROFILE } from '../../commons/constants'
import { useAuth } from '../../context/AuthContext'
import { getUrl } from '../../utils/helper'
import { Link, useParams } from 'react-router-dom'

export default function ProfileStatNav() {
  const {
    data: { stats: userStats },
  } = useAuth()

  const { categorie: category } = useParams()

  const theme = useTheme()

  return (
    <>
      <Paper sx={{ maxWidth: '88vw', m: '1em auto' }} xs={7} elevation={5}>
        {userStats && userStats?.length > 0 ? (
          <>
            <Tabs
              value={''}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab
                label={PROFILE + category}
                to={''}
                component={Link}
                value={''}
                sx={{
                  visibility: 'hidden',
                  position: 'absolute',
                  left: '-1000px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
              />
              {userStats?.map((stat) => (
                <Tab
                  key={stat?.name}
                  label={stat?.name}
                  to={getUrl([PROFILE, category, stat?.name.toLowerCase()])}
                  component={Link}
                  value={getUrl([PROFILE, category, stat?.name.toLowerCase()])}
                  sx={{
                    '&:hover,&:focus': {
                      boxShadow: `inset 0 0 10px ${theme.palette.primary[500]}}`,
                    },
                  }}
                />
              ))}
            </Tabs>
          </>
        ) : (
          'NO ANIMES OR MANGAS TO YOUR LIST YET, ADD SOME !'
        )}
      </Paper>
    </>
  )
}
