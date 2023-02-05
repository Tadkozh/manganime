import { gql } from 'graphql-request'

export const FAVORITES_LIST_REQUEST = gql`
  query FavoritesListMangAnime($ids: [Int], $type: MediaType) {
    Page(page: 1, perPage: 10) {
      media(sort: POPULARITY_DESC, type: $type, id_in: $ids) {
        id
        title {
          romaji
          english
        }
        coverImage {
          medium
          extraLarge
        }
      }
    }
  }
`
