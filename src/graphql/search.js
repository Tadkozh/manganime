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
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        lastPage
        total
      }
      media(
        search: $search
        format: $format
        status_in: $status
        averageScore_greater: $score
        popularity_greater: $popularity
        sort: $sort
        isAdult: $isAdult
      ) {
        id

        title {
          english
          romaji
        }
        coverImage {
          large
        }
        averageScore
      }
    }
  }
`
