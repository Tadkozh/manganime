import React from 'react'
import useGetTopDatas from '../hooks/getTopDatas'
import TopView from './TopView'

const TopDetails = ({ name }) => {
  const topDatas = useGetTopDatas(name)

  return (
    <>
      <article>
        <h2>Top {name.toUpperCase()}</h2>
        <TopView datas={topDatas} />
      </article>
    </>
  )
}

export default TopDetails
