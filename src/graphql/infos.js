import { gql } from 'graphql-request'

export const INFOS_REQUEST = gql`
  query InfoMangAnime($type: MediaType, $id: Int) {
    Page {
      media(type: $type, id: $id) {
        id
        type

        title {
          romaji
          english
          native
        }

        bannerImage
        coverImage {
          extraLarge
          large
          medium
        }

        trailer {
          id
          site
          thumbnail
        }

        rankings {
          rank
          context
        }

        isAdult
      }
    }
  }
`
