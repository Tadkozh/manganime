const selectValues = {
  scoreMin: [],
  sortBy: [
    { value: 'TRENDING_DESC', children: 'Trending' },
    { value: 'SCORE_DESC', children: 'Score' },
    { value: 'TITLE_ENGLISH_DESC', children: 'Title' },
    { value: 'START_DATE_DESC', children: 'Start date' },
    { value: 'END_DATE_DESC', children: 'End date' },
  ],

  anime: {
    format: [
      { value: 'TV', children: 'Serie' },
      { value: 'TV_SHORT', children: 'Short serie' },
      { value: 'MOVIE', children: 'Movie' },
      { value: 'SPECIAL', children: 'Special' },
      { value: 'OVA', children: 'OVA' },
      { value: 'ONA', children: 'ONA' },
      { value: 'MUSIC', children: 'Music' },
    ],
    status: [
      { value: 'FINISHED', children: 'Finished' },
      { value: 'RELEASING', children: 'Releasing' },
      { value: 'NOT_YET_RELEASED', children: 'Not yet released' },
      { value: 'CANCELLED', children: 'Cancelled' },
      { value: 'HIATUS', children: 'Hiatus' },
    ],
  },

  manga: {
    // A REVOIR TOUT !!!
    format: [
      { value: 'TV', children: 'Serie' },
      { value: 'TV_SHORT', children: 'Short serie' },
      { value: 'MOVIE', children: 'Movie' },
      { value: 'SPECIAL', children: 'Special' },
      { value: 'OVA', children: 'OVA' },
      { value: 'ONA', children: 'ONA' },
      { value: 'MUSIC', children: 'Music' },
    ],
    status: [
      { value: 'FINISHED', children: 'Finished' },
      { value: 'RELEASING', children: 'Releasing' },
      { value: 'NOT_YET_RELEASED', children: 'Not yet released' },
      { value: 'CANCELLED', children: 'Cancelled' },
      { value: 'HIATUS', children: 'Hiatus' },
    ],
  },
}

const notes = 5
for (let i = 0; i < notes; i++) {
  selectValues.scoreMin.push({ value: i * 20, children: i })
}

export { selectValues }
