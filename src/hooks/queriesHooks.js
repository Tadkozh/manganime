import { useQuery } from 'react-query'
import { clientApi } from '../utils/clientApi'

const useInfos = (type, id) => {
  const { data } = useClientApi(type, id, 'full')
  return data
}

const useNews = (type, id) => {
  const { data, status } = useClientApi(type, id, 'news')
  return { data, status }
}

const useRecommendation = (type, id) => {
  const { data, status } = useClientApi(type, id, 'recommendations')
  return { data, status }
}

const useReviews = (type, id) => {
  const { data } = useClientApi(type, id, 'reviews')
  return data
}

const useSearch = (type, search, page = 1, options = {}) => {
  let queryString = Object.keys(options)
    .map((key) => {
      return `${options[key]}`
    })
    .join('')
  const { data } = useQuery({
    queryKey: `${type}${search}${queryString}&page=${page}`,
    queryFn: () => clientApi(`${type}${search}${queryString}&page=${page}`),
  })
  return data
}

const useTopOtaku = (type, limit = '') => {
  const newLimit = limit === '' ? '' : `?limit=${limit}`
  const { data } = useQuery({
    queryKey: `top/${type}${newLimit}}`,
    queryFn: () => clientApi(`top/${type}${newLimit}`),
  })
  return data?.data
}

const useClientApi = (type, id, endpoint) => {
  const { data, status } = useQuery({
    queryKey: `${type}/${id}/${endpoint}`,
    queryFn: () => clientApi(`${type}/${id}/${endpoint}`),
  })
  return { data: data?.data, status }
}

export {
  useInfos,
  useNews,
  useSearch,
  useTopOtaku,
  useRecommendation,
  useReviews,
}
