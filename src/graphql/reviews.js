import { gql } from 'graphql-request'

export const REVIEWS_REQUEST = gql`
  query Details($type: MediaType, $id: [Int]) {
    Page {
      media(type: $type, id: $id) {
        reviews {
          nodes {
            summary
            body(asHtml: true)
            rating
            ratingAmount
            userRating
            score
            createdAt
            updatedAt
            user {
              avatar
              name
            }
            media
          }
        }
      }
    }
  }
`
