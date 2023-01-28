import { clientApi, graphQLClient } from '../utils/clientApi'
import { useQuery } from 'react-query'
import { SEARCH_REQUEST } from '../graphql/search'
import { TOP_REQUEST } from '../graphql/top'
import { INFOS_REQUEST } from '../graphql/infos'
import { FAVORITES_LIST_REQUEST } from '../graphql/favorites'
import { GALERY_REQUEST } from '../graphql/galery'
import { DETAILS_REQUEST } from '../graphql/details'
import { REVIEWS_REQUEST } from '../graphql/reviews'
import { RECOMMENDATIONS_REQUEST } from '../graphql/recommendations'
import { EPISODE_REQUEST } from '../graphql/episodes'

function useInfos(type, id) {
  const { data } = useQuery({
    queryKey: `${type}/${id}`,
    queryFn: async () =>
      await graphQLClient.request(INFOS_REQUEST, {
        type: type,
        id: id,
      }),
    staleTime: Infinity,
  })
  return data

  // const { data, status } = await graphQLClient.request(INFOS_REQUEST, {
  //   type: type,
  //   id: id,
  // })
  // console.log('type:', type)
  // console.log('id:', id)
  // console.log('data:', data)
  // console.log('{ data }:', { data })
  // return { data, status }
}

const useGalery = (type, id) => {
  const { data } = useQuery({
    queryKey: `${type}/${id}`,
    queryFn: async () =>
      await graphQLClient.request(GALERY_REQUEST, {
        type: type,
        id: id,
      }),
    staleTime: Infinity,
  })

  return data

  // const { data, status } = useClientApi(type, id, 'pictures')
  // return { data, status }
}

const useDetails = (type, id) => {
  const { data } = useQuery({
    queryKey: `${type}/${id}`,
    queryFn: async () =>
      await graphQLClient.request(DETAILS_REQUEST, {
        type: type,
        id: id,
      }),
    staleTime: Infinity,
  })

  return data
}

const useNews = (type, id) => {
  const { data, status } = useClientApi(type, id, 'news')
  return { data, status }
}

const useRecommendations = (type, id) => {
  const { data } = useQuery({
    queryKey: `${type}/${id}`,
    queryFn: async () =>
      await graphQLClient.request(RECOMMENDATIONS_REQUEST, {
        type: type,
        id: id,
      }),
    staleTime: Infinity,
  })

  return data
}

const useReviews = (type, id) => {
  const { data } = useQuery({
    queryKey: `${type}/${id}`,
    queryFn: async () =>
      await graphQLClient.request(REVIEWS_REQUEST, {
        type: type,
        id: id,
      }),
    staleTime: Infinity,
  })

  return data
}

const useSearch = (type, query) => {
  let queryString = Object.keys(query)
    .map((key) => {
      return `${query[key]}`
    })
    .join('')

  const { data } = useQuery({
    queryKey: `${type}/${queryString}`,
    queryFn: async () =>
      await graphQLClient.request(SEARCH_REQUEST, {
        search: query?.search,
        format: query?.format,
        status: query?.status,
        score: query?.score,
        popularity: query?.popularity,
        sort: query?.sortBy,
        isAdult: query?.isAdult,
        page: query?.page,
        perPage: query?.perPage,
      }),
    staleTime: Infinity,
  })

  return data
}

const useFavorites = (type, listFavorites = []) => {
  const { data, status } = useQuery({
    queryKey: `favorites/${type}/${listFavorites.join('')}`,
    queryFn: async () =>
      await graphQLClient.request(FAVORITES_LIST_REQUEST, {
        ids: listFavorites,
        type: type,
      }),
    staleTime: Infinity,
  })
  return { data: data?.Page.media, status }
}

const useTop = (type, perPage = 12) => {
  const { data } = useQuery({
    queryKey: `top/${type}`,
    queryFn: async () =>
      await graphQLClient.request(TOP_REQUEST, {
        type: type,
        perPage: perPage,
      }),
    staleTime: Infinity,
  })
  return data
}

const useEpisode = (perPage = 12) => {
  const { data } = useQuery({
    queryKey: `top/episode`,
    queryFn: async () =>
      await graphQLClient.request(EPISODE_REQUEST, {
        perPage: perPage,
      }),
    staleTime: Infinity,
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
  useFavorites,
  useInfos,
  useGalery,
  useDetails,
  useNews,
  useSearch,
  useTop,
  useEpisode,
  useRecommendations,
  useReviews,
}
