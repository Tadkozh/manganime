import { gql } from 'graphql-request'

export const RECOMMENDATION_REQUEST = gql`
  query Recommendation($page: Int, $perPage: Int, $id: Int) {
    Page(page: $page, perPage: $perPage) {
      recommendations(mediaRecommendationId: $id) {
        media {
          id
          title {
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
