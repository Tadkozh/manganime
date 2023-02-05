import React from 'react'
import { downloadFile } from '../database/storage'

const useLoadImage = (user) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [image, setImage] = React.useState(null)

  React.useEffect(() => {
    const getImage = async () => {
      setIsLoading(true)
      await downloadFile(user.picture).then((url) => setImage(url))
      setIsLoading(false)
    }
    if (user?.picture) {
      getImage()
    }
  }, [image, user])

  return { isLoading, image }
}

export { useLoadImage }
