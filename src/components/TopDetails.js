import React from 'react'
import useGetTopDatas from '../hooks/getTopDatas'
import TopView from './TopView'

const TopDetails = ({ name }) => {
  const { topDatas } = useGetTopDatas(name)

  return (
    <>
      <article className=" top-article">
        <h2>Top {name}</h2>
        <TopView datas={topDatas} />
      </article>
    </>
  )
}

export default TopDetails
