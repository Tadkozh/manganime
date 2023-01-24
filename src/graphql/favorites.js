import { gql } from 'graphql-request'

export const FAVORITES_LIST_REQUEST = gql`
  query InfoListMangAnime($ids: [Int], $type: MediaType) {
    Page(page: 1, perPage: 10) {
      media(sort: POPULARITY_DESC, type: $type, id_in: $ids) {
        title {
          romaji
        }
        coverImage {
          medium
        }
      }
    }
  }
`