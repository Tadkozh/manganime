import { gql } from 'graphql-request'

export const SYNOPSIS_REQUEST = gql`
  query Synopsis($type: MediaType, $id: Int) {
    Page {
      media(type: $type, id: $id) {
        id

        description(asHtml: true)
      }
    }
  }
`
