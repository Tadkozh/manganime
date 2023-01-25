import { gql } from 'graphql-request'

export const INFOS_REQUEST = gql`
  query InfoMangAnime($type: MediaType, $id: Int) {
    Page {
      media(type: $type, id: $id) {
        id
        title {
          english
          romaji
          native
        }

        bannerImage
        coverImage {
          extraLarge
          large
          medium
        }

        format
        status

        favourites
        averageScore

        rankings {
          rank
          context
        }

        streamingEpisodes {
          title
          thumbnail
          url
          site
        }

        isAdult
      }
    }
  }
`
