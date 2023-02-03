import React from 'react'
import { useParams } from 'react-router-dom'
import { Paper } from '../ui'
import { useAuth } from '../../context/AuthContext'
import { ANIME } from '../../commons/constants'
import { useFavorites } from '../../hooks/queriesHooks'
import TopView from '../top/TopView'

const ProfileStatView = () => {
  const { categorie: category, stat: nameList } = useParams()
  console.log(category)
  const {
    data: { stats: userStats },
  } = useAuth()
  const arrayType = category === ANIME ? 'animeId' : 'mangaId'
  const statIdContent = userStats.find(
    (stat) =>
      stat.name === nameList.charAt(0).toUpperCase() + nameList.slice(1),
  )[arrayType]
  console.log(statIdContent)
  const { data: datas } = useFavorites(category, statIdContent)
  console.log(datas)

  return (
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
      {datas ? (
        <TopView
          datas={datas}
          isHomePage={false}
          type={category.toUpperCase()}
          rank={1}
        />
      ) : null}
    </Paper>
  )
}

export default ProfileStatView
