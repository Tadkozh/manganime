import { gql } from 'graphql-request'

export const TOP_REQUEST = gql`
  query TopMangAnime($type: MediaType, $perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      media(type: $type, sort: SCORE_DESC) {
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
