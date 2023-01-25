import { gql } from 'graphql-request'

export const SEARCH_REQUEST = gql`
  query SearchMangAnime(
    $page: Int
    $perPage: Int
    $score: Int
    $popularity: Int
    $status: [MediaStatus]
    $format: MediaFormat
    $sort: [MediaSort]
    $search: String
  ) {
    Page(page: $page, perPage: $perPage) {
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
          romaji
        }
        coverImage {
          extraLarge
        }
        genres
      }
    }
  }
`
