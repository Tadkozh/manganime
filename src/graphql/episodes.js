import { gql } from 'graphql-request'

export const EPISODE_REQUEST = gql`
  query TopAnimeEpisode($perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
        }
        bannerImage
        coverImage {
          extraLarge
          medium
        }
        streamingEpisodes {
          title
          thumbnail
          url
          site
        }
      }
    }
  }
`
