import { graphQLClient } from '../utils/clientApi'
import { useInfiniteQuery, useQuery } from 'react-query'
import * as GQL from '../graphql/index'

const useSearch = (type, query) => {
  let queryString = Object.keys(query)
    .map((key) => {
      return `${query[key]}`
    })
    .join('')

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: `${type}/${queryString}/search`,
    queryFn: async () => {
      return await graphQLClient.request(GQL.SEARCH_REQUEST, {
        search: query?.search,
        format: query?.format,
        status: query?.status,
        score: query?.score,
        popularity: query?.popularity,
        sort: query?.sortBy,
        isAdult: query?.isAdult,
        page: query?.page,
        perPage: query?.perPage,
      })
    },
    getNextPageParam: (lastPage, page) => {
      return lastPage.Page.pageInfo.hasNextPage
    },
    keepPreviousData: true,
    staleTime: Infinity,
  })

  return { data, fetchNextPage, isFetchingNextPage }
}

function useInfos(type, id) {
  const { data } = useQuery({
    queryKey: `${type}/${id}/infos`,
    queryFn: async () =>
      await graphQLClient.request(GQL.INFOS_REQUEST, {
        type: type.toUpperCase(),
        id: id,
      }),
    staleTime: Infinity,
  })

  return data
}

const usePresentation = (type, id) => {
  const { data } = useQuery({
    queryKey: `${type}/${id}/presentation`,
    queryFn: async () =>
      await graphQLClient.request(GQL.PRESENTATION_REQUEST, {
        type: type.toUpperCase(),
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
      await graphQLClient.request(GQL.TITLE_REQUEST, {
        type: type.toUpperCase(),
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
      await graphQLClient.request(GQL.GALERY_REQUEST, {
        type: type.toUpperCase(),
        id: id,
      }),
    staleTime: Infinity,
  })

  return data
}

const useRating = (type, id) => {
  const { data } = useQuery({
    queryKey: `${type}/${id}/rating`,
    queryFn: async () =>
      await graphQLClient.request(GQL.RATING_REQUEST, {
        type: type.toUpperCase(),
        id: id,
      }),
    staleTime: Infinity,
  })

  return data
}

const useSynopsis = (type, id) => {
  const { data } = useQuery({
    queryKey: `${type}/${id}/synopsis`,
    queryFn: async () =>
      await graphQLClient.request(GQL.SYNOPSIS_REQUEST, {
        type: type.toUpperCase(),
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
      await graphQLClient.request(GQL.DETAILS_REQUEST, {
        type: type.toUpperCase(),
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
      await graphQLClient.request(GQL.REVIEWS_REQUEST, {
        type: type.toUpperCase(),
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
      await graphQLClient.request(GQL.STREAMING_REQUEST, {
        type: type.toUpperCase(),
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
      await graphQLClient.request(GQL.RECOMMENDATIONS_REQUEST, {
        type: type.toUpperCase(),
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
      await graphQLClient.request(GQL.FAVORITES_LIST_REQUEST, {
        ids: listFavorites,
        type: type.toUpperCase(),
      }),
    staleTime: Infinity,
  })

  return { data: data?.Page.media, status }
}

const useTop = (type, perPage = 12) => {
  const { data } = useQuery({
    queryKey: `${type}/top`,
    queryFn: async () =>
      await graphQLClient.request(GQL.TOP_REQUEST, {
        type: type.toUpperCase(),
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
      await graphQLClient.request(GQL.EPISODE_REQUEST, {
        perPage: perPage,
      }),
    staleTime: Infinity,
  })

  return data
}

export {
  useEpisode,
  useFavorites,
  useSearch,
  useInfos,
  usePresentation,
  useTitle,
  useGalery,
  useRating,
  useSynopsis,
  useDetails,
  useReviews,
  useStreaming,
  useRecommendations,
  useTop,
}
