import { gql } from 'graphql-request'

export const TOP_REQUEST = gql`
  query TopMangAnime($type: MediaType) {
    Page(page: 1, perPage: 10) {
      media(type: $type, sort: TRENDING_DESC) {
        id
        title {
          romaji
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`
