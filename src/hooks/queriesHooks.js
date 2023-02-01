import { graphQLClient } from '../utils/clientApi'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import * as GQL from '../graphql/index'

const useSearch = (type, query) => {
  let queryKeys = []
  Object.keys(query).forEach((key) => {
    queryKeys.push({ [key]: query[key] })
  })

  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery({
    queryKey: [type, 'search', ...queryKeys],
    queryFn: async ({ pageParam = 1 }) =>
      await graphQLClient.request(GQL.SEARCH_REQUEST, {
        search: query?.search,
        format: query?.format,
        status: query?.status,
        score: query?.score,
        popularity: query?.popularity,
        sort: query?.sortBy,
        isAdult: query?.isAdult,
        page: pageParam,
        perPage: query?.perPage,
        type: type.toUpperCase(),
      }),
    getNextPageParam: (lastPage, page) => {
      return lastPage.Page.pageInfo.hasNextPage
        ? lastPage.Page.pageInfo.currentPage + 1
        : false
    },
    keepPreviousData: false,
    staleTime: Infinity,
  })

  return { data: data?.pages, fetchNextPage, isFetching, hasNextPage }
}

function useInfos(type, id) {
  const { data } = useQuery({
    queryKey: [type, id, 'infos'],
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
    queryKey: [type, id, 'presentation'],
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
    queryKey: [type, id, 'title'],
    queryFn: async () =>
      await graphQLClient.request(GQL.TITLE_REQUEST, {
        type: type.toUpperCase(),
        id: id,
      }),
    staleTime: Infinity,
  })

  return data
}

const useReviews = (type, id) => {
  const { data } = useQuery({
    queryKey: [type, id, 'reviews'],
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
    queryKey: [type, id, 'streaming'],
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
    queryKey: [type, id, 'recommendations'],
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
    queryKey: [type, ...listFavorites, 'favorites'],
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
  const { data, status } = useQuery({
    queryKey: [type, 'top'],
    queryFn: async () =>
      await graphQLClient.request(GQL.TOP_REQUEST, {
        type: type.toUpperCase(),
        perPage: perPage,
      }),
    staleTime: Infinity,
  })

  return { data, status }
}

const useEpisode = (perPage = 12) => {
  const { data, status } = useQuery({
    queryKey: ['top', 'episode'],
    queryFn: async () =>
      await graphQLClient.request(GQL.EPISODE_REQUEST, {
        perPage: perPage,
      }),
    staleTime: Infinity,
  })

  return { data, status }
}

export {
  useEpisode,
  useTop,
  useSearch,
  useInfos,
  usePresentation,
  useTitle,
  useReviews,
  useStreaming,
  useRecommendations,
  useFavorites,
}
