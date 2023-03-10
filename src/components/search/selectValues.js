import {
  CANCELLED,
  CHAPTERS_DESC,
  END_DATE,
  END_DATE_DESC,
  FAVOURITES_DESC,
  FINISHED,
  FORMAT,
  FORMAT_DESC,
  HIATUS,
  MANGA_SCH,
  MOVIE,
  MUSIC,
  NOT_YET_RELEASED,
  NOVEL,
  ONA,
  ONE_SHOT,
  OVA,
  POPULARITY_DESC,
  RELEASING,
  SCORE,
  SCORE_DESC,
  SORT,
  SPECIAL,
  START_DATE,
  START_DATE_DESC,
  STATUS,
  TITLE_ENGLISH_DESC,
  TRENDING_DESC,
  TV,
  TV_SHORT,
  UPDATED_AT_DESC,
} from '../../commons/constants'

const selectValues = {
  score: [],
  status: [
    { value: FINISHED, children: 'Finished' },
    { value: RELEASING, children: 'Releasing' },
    { value: NOT_YET_RELEASED, children: 'Not yet released' },
    { value: CANCELLED, children: 'Cancelled' },
    { value: HIATUS, children: 'Hiatus' },
  ],

  anime: {
    format: [
      { value: TV, children: 'Serie' },
      { value: TV_SHORT, children: 'Short serie' },
      { value: MOVIE, children: 'Movie' },
      { value: SPECIAL, children: 'Special' },
      { value: OVA, children: 'OVA' },
      { value: ONA, children: 'ONA' },
      { value: MUSIC, children: 'Music' },
    ],
    sortBy: [
      { value: TRENDING_DESC, children: 'Trending' },
      { value: SCORE_DESC, children: 'Score' },
      { value: START_DATE_DESC, children: 'Newest started' },
      { value: END_DATE_DESC, children: 'Newest ended' },
      { value: START_DATE, children: 'Oldest started' },
      { value: END_DATE, children: 'Oldest ended' },
      { value: TITLE_ENGLISH_DESC, children: 'Title' },
    ],
  },

  manga: {
    format: [
      { value: MANGA_SCH, children: 'Manga' },
      { value: NOVEL, children: 'Novel' },
      { value: ONE_SHOT, children: 'One shot' },
    ],
    sortBy: [
      { value: TRENDING_DESC, children: 'Trending' },
      { value: SCORE_DESC, children: 'Score' },
      { value: POPULARITY_DESC, children: 'Popularity' },
      { value: START_DATE_DESC, children: 'Newest started' },
      { value: END_DATE_DESC, children: 'Newest ended' },
      { value: START_DATE, children: 'Oldest started' },
      { value: END_DATE, children: 'Oldest ended' },
      { value: FORMAT_DESC, children: 'Format' },
      { value: CHAPTERS_DESC, children: 'Chapter' },
      { value: FAVOURITES_DESC, children: 'Favourites' },
      { value: UPDATED_AT_DESC, children: 'Last updated' },
    ],
  },
}

const fields = [
  { title: 'Format', property: FORMAT },
  { title: 'Score min', property: SCORE, onlyvalue: true },
  { title: 'Status', property: STATUS, onlyvalue: true },
  { title: 'Sort by', property: SORT },
]

const notes = 5
for (let i = 0; i < notes; i++) {
  selectValues.score.push({ value: i * 20, children: i })
}
const getSelectValues = (type, property) => {
  type = type.toLowerCase()
  return selectValues?.[type]?.[property]
}

export { fields, selectValues, getSelectValues }
