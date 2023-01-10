import React from 'react'

const TopView = ({ datas }) => {
  return (
    <ul>
      {datas.map((data, index) => {
        return (
          <li key={index}>
            {data.title}
            <img alt={data.title} src={data.images.jpg.image_url} />
          </li>
        )
      })}
    </ul>
  )
}

export default TopView
