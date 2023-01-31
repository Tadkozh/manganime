import { gql } from 'graphql-request'

export const INFOS_REQUEST = gql`
  query InfoMangAnime($type: MediaType, $id: Int) {
    Page {
      media(type: $type, id: $id) {
        id
        type

        # PRESENTATION
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
        meanScore
        trailer {
          id
          site
          thumbnail
        }

        # SYNOPSIS
        description(asHtml: true)

        # DETAILS
        genres
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
