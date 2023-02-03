import { gql } from 'graphql-request'

export const TREND_REQUEST = gql`
  query trendMangAnime($page: Int, $perPage: Int, $type: MediaType) {
    Page(page: $page, perPage: $perPage) {
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
