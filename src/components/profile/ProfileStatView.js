import React from 'react'
import { useParams } from 'react-router-dom'
import { Paper } from '../ui'
import { useAuth } from '../../context/AuthContext'

const ProfileStatView = () => {
  const { categorie: category, stat: nameList } = useParams()
  console.log(category, nameList)
  const { data: userDatas } = useAuth()
  console.log(userDatas)
  return (
    <Paper
      sx={{
        with: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
      }}
      xs={7}
      elevation={5}
    >
      Blablabla
    </Paper>
  )
}

export default ProfileStatView
