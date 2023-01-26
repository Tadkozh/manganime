import { gql } from 'graphql-request'

export const DETAILS_REQUEST = gql`
  query Details($type: MediaType, $id: [Int]) {
    Page {
      media(type: $type, id_in: $id) {
        type
        favourites
        popularity
        isLicensed
      }
    }
  }
`
