import { gql } from 'graphql-request'

export const GALERY_REQUEST = gql`
  query Galery($type: MediaType, $id: [Int]) {
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
