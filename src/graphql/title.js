import { gql } from 'graphql-request'

export const TITLE_REQUEST = gql`
  query Title($type: MediaType, $id: Int) {
    Page {
      media(type: $type, id: $id) {
        id

        title {
          romaji
          english
        }
      }
    }
  }
`
