import React from 'react'
import '../styles/common-css.css'

const TopView = ({ datas }) => {
  return (
    <ul className="datagrid">
      {datas.map((data, index) => {
        return (
          <li key={index}>
            {data.title}
            <br />
            <img alt={data.title} src={data.images.jpg.image_url} />
          </li>
        )
      })}
    </ul>
  )
}

export default TopView
