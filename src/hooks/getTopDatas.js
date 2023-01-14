import axios from 'axios'
import React from 'react'

const useGetTopDatas = (name, limit = '') => {
  const url = `https://api.jikan.moe/v4/top/${name}?limit=${limit}`
  const [topDatas, setTopDatas] = React.useState([])

  const request = React.useCallback((url) => {
    axios
      .get(url)
      .then((response) => {
        setTopDatas(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  React.useEffect(() => {
    const delay = setTimeout(() => request(url), 200)
    return () => clearTimeout(delay)
  }, [request, url])

  return { topDatas }
}

export default useGetTopDatas
