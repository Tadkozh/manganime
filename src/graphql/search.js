import { gql } from 'graphql-request'

export const SEARCH_REQUEST = gql`
  query SearchMangAnime(
    $search: String
    $format: MediaFormat
    $status: [MediaStatus]
    $score: Int
    $popularity: Int
    $sort: [MediaSort]
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
        averageScore_greater: $score
        popularity_greater: $popularity
        status_in: $status
        format: $format
        sort: $sort
        search: $search
      ) {
        id
        title {
          english
          romaji
          native
        }
        coverImage {
          large
          medium
        }
        genres

        format
        status

        averageScore

        isAdult
      }
    }
  }
`
