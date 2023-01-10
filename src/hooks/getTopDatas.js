import axios from 'axios'
import React from 'react'

const useGetTopDatas = (condition, url, dataToSet, setCondition) => {
  React.useEffect(() => {
    if (condition) {
      axios
        .get(url)
        .then((response) => {
          dataToSet(response.data.data)
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
    return () => {
      setCondition(false)
    }
  }, [condition, dataToSet, setCondition, url])
}

export default useGetTopDatas
