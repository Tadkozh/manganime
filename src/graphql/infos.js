import { gql } from 'graphql-request'

export const INFOS_REQUEST = gql`
  query InfoMangAnime($type: MediaType, $id: Int) {
    Page {
      media(type: $type, id: $id) {
        id
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

        format

        averageScore
        meanScore

        rankings {
          rank
          context
        }

        isAdult

        description(asHtml: true)
      }
    }
  }
`
