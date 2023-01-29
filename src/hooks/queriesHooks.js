import { clientApi, graphQLClient } from '../utils/clientApi'
import { useQuery } from 'react-query'
import { EPISODE_REQUEST } from '../graphql/episodes'
import { TOP_REQUEST } from '../graphql/top'
import { SEARCH_REQUEST } from '../graphql/search'
import { INFOS_REQUEST } from '../graphql/infos'
import { TITLE_REQUEST } from '../graphql/title'
import { FAVORITES_LIST_REQUEST } from '../graphql/favorites'
import { GALERY_REQUEST } from '../graphql/galery'
import { DETAILS_REQUEST } from '../graphql/details'
import { REVIEWS_REQUEST } from '../graphql/reviews'
import { STREAMING_REQUEST } from '../graphql/streaming'
import { RECOMMENDATIONS_REQUEST } from '../graphql/recommendations'

const useSearch = (type, query) => {
  let queryString = Object.keys(query)
    .map((key) => {
      return `${query[key]}`
    })
    .join('')

  const { data } = useQuery({
    queryKey: `${type}/${queryString}/search`,
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

function useInfos(type, id) {
  const { data } = useQuery({
    queryKey: `${type}/${id}/infos`,
    queryFn: async () =>
      await graphQLClient.request(INFOS_REQUEST, {
        type: type,
        id: id,
      }),
    staleTime: Infinity,
  })

  return data
}

const useTitle = (type, id) => {
  const { data } = useQuery({
    queryKey: `${type}/${id}/title`,
    queryFn: async () =>
      await graphQLClient.request(TITLE_REQUEST, {
        type: type,
        id: id,
      }),
    staleTime: Infinity,
  })

  return data
}

const useGalery = (type, id) => {
  const { data } = useQuery({
    queryKey: `${type}/${id}/galery`,
    queryFn: async () =>
      await graphQLClient.request(GALERY_REQUEST, {
        type: type,
        id: id,
      }),
    staleTime: Infinity,
  })

  return data
}

const useDetails = (type, id) => {
  const { data } = useQuery({
    queryKey: `${type}/${id}/details`,
    queryFn: async () =>
      await graphQLClient.request(DETAILS_REQUEST, {
        type: type,
        id: id,
      }),
    staleTime: Infinity,
  })

  return data
}

const useReviews = (type, id) => {
  const { data } = useQuery({
    queryKey: `${type}/${id}/reviews`,
    queryFn: async () =>
      await graphQLClient.request(REVIEWS_REQUEST, {
        type: type,
        id: id,
      }),
    staleTime: Infinity,
  })

  return data
}

const useStreaming = (type, id) => {
  const { data } = useQuery({
    queryKey: `${type}/${id}/streaming`,
    queryFn: async () =>
      await graphQLClient.request(STREAMING_REQUEST, {
        type: type,
        id: id,
      }),
    staleTime: Infinity,
  })

  return data
}

const useRecommendations = (type, id) => {
  const { data } = useQuery({
    queryKey: `${type}/${id}/recommendations`,
    queryFn: async () =>
      await graphQLClient.request(RECOMMENDATIONS_REQUEST, {
        type: type,
        id: id,
      }),
    staleTime: Infinity,
  })

  return data
}

const useFavorites = (type, listFavorites = []) => {
  const { data, status } = useQuery({
    queryKey: `${type}/${listFavorites.join('')}/favorites`,
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
    queryKey: `${type}/top`,
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
  useEpisode,
  useFavorites,
  useSearch,
  useInfos,
  useTitle,
  useGalery,
  useDetails,
  useReviews,
  useStreaming,
  useRecommendations,
  useTop,
}
