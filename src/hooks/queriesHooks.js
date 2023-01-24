import { useQuery } from 'react-query'
import { TOP_REQUEST } from '../graphql/top'
import { clientApi, graphQLClient } from '../utils/clientApi'

const useInfos = (type, id) => {
  const { data, status } = useClientApi(type, id, 'full')
  return { data, status }
}

const useGalery = (type, id) => {
  const { data, status } = useClientApi(type, id, 'pictures')
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

// exemple avec Top
// a la place de client api = > await graphQLClient.request(TOP_REQUEST, { type:type })
const useTop = (type, perPage = 12) => {
  const { data } = useQuery({
    queryKey: `top/${type}`,
    queryFn: async () =>
      await graphQLClient.request(TOP_REQUEST, {
        type: type,
        perPage: perPage,
      }),
    staleTime: 6000,
  })
  return data
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
  useGalery,
  useNews,
  useSearch,
  useTop,
  useRecommendation,
  useReviews,
}
