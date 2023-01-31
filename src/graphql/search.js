import { gql } from 'graphql-request'

export const SEARCH_REQUEST = gql`
  query SearchMangAnime(
    $search: String
    $format: MediaFormat
    $status: [MediaStatus]
    $score: Int
    $popularity: Int
    $sort: [MediaSort]
    $isAdult: Boolean
    $page: Int
    $perPage: Int
    $type: MediaType
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
      }
      media(
        search: $search
        format: $format
        status_in: $status
        averageScore_greater: $score
        popularity_greater: $popularity
        sort: $sort
        isAdult: $isAdult
        type:$type
      ) {
        id

        title {
          romaji
          english
        }
        coverImage {
          large
        }
        averageScore
      }
    }
  }
`
