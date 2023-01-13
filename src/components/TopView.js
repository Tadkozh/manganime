import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import '../styles/common-css.css'

const TopView = ({ datas }) => {
  return (
    <ul className="datagrid">
      {datas.map((data, index) => {
        return (
          <li key={index} title={`${data.genres[0].type}-list`}>
            <Card
              sx={{
                minWidth: 275,
              }}
            >
              <CardContent>
                {data.title}
                <br />
                <img alt={data.title} src={data.images.jpg.image_url} />
              </CardContent>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}

export default TopView
