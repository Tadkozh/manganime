import { gql } from 'graphql-request'

export const GALERY_REQUEST = gql`
  query Galery($id: [Int], $type: MediaType) {
    Page {
      media(type: $type, id_in: $id) {
        coverImage {
          extraLarge
          large
          medium
        }
      }
    }
  }
`
