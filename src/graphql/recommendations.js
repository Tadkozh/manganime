import { gql } from 'graphql-request'

export const RECOMMENDATIONS_REQUEST = gql`
  query Recommendations($page: Int, $perPage: Int, $id: Int) {
    Page(page: $page, perPage: $perPage) {
      recommendations(mediaRecommendationId: $id) {
        media {
          id
          title {
            english
            romaji
          }
          coverImage {
            extraLarge
            large
            medium
          }
        }
      }
    }
  }
`
