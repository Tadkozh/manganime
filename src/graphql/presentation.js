import { gql } from 'graphql-request'

export const PRESENTATION_REQUEST = gql`
  query Presentation($type: MediaType, $id: Int) {
    Page {
      media(type: $type, id: $id) {
        id
        type
        title {
          romaji
          english
          native
        }

        favourites
      }
    }
  }
`
