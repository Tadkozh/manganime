import { gql } from 'graphql-request'

export const RATING_REQUEST = gql`
  query Rating($type: MediaType, $id: [Int]) {
    Page {
      media(type: $type, id_in: $id) {
        id
        type

        meanScore
      }
    }
  }
`
