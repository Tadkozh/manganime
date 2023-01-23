import { gql } from 'graphql-request'

export const INFOS_REQUEST = gql`
  query InfoMangAnime($id: Int, $type: MediaType) {
    Page {
      media(id: $id, type: $type) {
        id
        title {
          romaji
        }
        coverImage {
          extraLarge
          large
          medium
        }
        genres
        format
        volumes
        chapters
        status
        description
        startDate {
          year
          month
          day
        }
        rankings {
          rank
          context
        }
      }
    }
  }
`
