import React from 'react'
import { Paper } from '../ui'

const WatchItemCarousel = ({ type, options = '', limit = '' }) => {
  const [watchDatas, setWatchDatas] = React.useState('')
  console.log(watchDatas)

  React.useEffect(() => {
    setWatchDatas(type)
  }, [type])

  return (
    <>
      {watchDatas
        ? watchDatas?.map((watchData, index) => (
            <Paper elevation={3} key={index}>
              {watchData.entry.images.jpg.image_url}
            </Paper>
          ))
        : null}
    </>
  )
}

export default WatchItemCarousel
