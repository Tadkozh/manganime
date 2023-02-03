import { gql } from 'graphql-request'

export const TREND_REQUEST = gql`
  query trendMangAnime($perPage: Int, $type: MediaType) {
    Page(page: 1, perPage: $perPage) {
      media(sort: TRENDING_DESC, type: $type) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
      }
    }
  }
`
