import { gql } from 'graphql-request'

export const DETAILS_REQUEST = gql`
  query Details($type: MediaType, $id: Int) {
    Page {
      media(type: $type, id: $id) {
        id
        type

        genres
        meanScore
        rankings {
          rank
        }
        popularity
        status
        startDate {
          day
          month
          year
        }
        endDate {
          day
          month
          year
        }
        episodes
        volumes
        chapters
        duration
        studios {
          nodes {
            name
          }
        }
        isLicensed
        source
      }
    }
  }
`
