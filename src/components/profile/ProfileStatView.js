import React from 'react'
import { useParams } from 'react-router-dom'
import { Paper } from '../ui'
import { useAuth } from '../../context/AuthContext'
import { ANIME } from '../../commons/constants'
import { useFavorites } from '../../hooks/queriesHooks'
import TopView from '../top/TopView'
import ProfileStatNav from './ProfileStatNav'

const ProfileStatView = ({ isStatOn = false }) => {
  const { categorie: category, stat: nameList } = useParams()
  const {
    data: { stats: userStats },
  } = useAuth()

  const arrayType = category === ANIME ? 'animeId' : 'mangaId'

  const statIdContent = nameList
    ? userStats?.find(
        (stat) =>
          stat?.name ===
          nameList?.charAt(0)?.toUpperCase() + nameList?.slice(1),
      )[arrayType]
    : []

  const { data: datas } = useFavorites(category, statIdContent) ?? null

  return (
    <>
      <>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 0,
            maxWidth: '88vw',
            m: 'auto',
          }}
          xs={7}
          elevation={5}
        >
          <ProfileStatNav />
          {isStatOn && datas && datas?.length > 0 ? (
            <TopView
              datas={datas}
              isHomePage={false}
              type={category.toUpperCase()}
              rank={1}
            />
          ) : null}
        </Paper>
      </>
    </>
  )
}

export default ProfileStatView
