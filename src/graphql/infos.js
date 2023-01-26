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

        streamingEpisodes {
          title
          thumbnail
          url
          site
        }

        isAdult

        description

        # DETAILS
        type
        genres
        meanScore
        rankings {
          rank
        }
        popularity
        favourites
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
