import { gql } from 'graphql-request'

export const REVIEWS_REQUEST = gql`
  query Details($type: MediaType, $id: Int) {
    Page {
      media(type: $type, id: $id) {
        id

        reviews {
          nodes {
            summary
            rating
            ratingAmount
            userRating
            score
            createdAt
            updatedAt
            user {
              avatar {
                large
                medium
              }
              name
            }
            media {
              id
            }
            body(asHtml: true)
          }
        }
      }
    }
  }
`
