import { useQuery } from 'react-query'
import { clientApi } from '../utils/clientApi'

const useInfos = (type, id) => {
  const { data, status } = useClientApi(type, id, 'full')
  return { data, status }
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
  return { data }
}

const useSearch = (type, options, page = 1) => {
  const { data } = useQuery({
    queryKey: `${type}${options}&page=${page}`,
    queryFn: () => clientApi(`${type}${options}&page=${page}`),
    staleTime: Infinity,
  })
  return data
}

const useTopOtaku = (type, limit = '') => {
  const newLimit = limit === '' ? '' : `?limit=${limit}`
  const { data } = useQuery({
    queryKey: `top/${type}${newLimit}}`,
    queryFn: () => clientApi(`top/${type}${newLimit}`),
    staleTime: Infinity,
  })
  return data?.data
}

const useClientApi = (type, id, endpoint) => {
  const { data, status } = useQuery({
    queryKey: `${type}/${id}/${endpoint}`,
    queryFn: () => clientApi(`${type}/${id}/${endpoint}`),
    staleTime: Infinity,
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
