const searchValues = {
  scoreMin: [],
  sort: [{ value: 'asc', children: 'Ascending' }],
  anime: {
    order_by: [
      { value: 'title', children: 'Title' },
      { value: 'score', children: 'Score' },
      { value: 'scored_by', children: 'Scored by' },
      { value: 'popularity', children: 'Popularity' },
      { value: 'members', children: 'Members' },
      { value: 'favorites', children: 'Favorites' },
      { value: 'rank', children: 'Rank' },
      { value: 'type', children: 'Type' },
      { value: 'rating', children: 'Rating' },
      { value: 'episodes', children: 'Episodes' },
      { value: 'start_date', children: 'Start date' },
      { value: 'end_date', children: 'End date' },
    ],
    type: [
      { value: 'tv', children: 'Serie' },
      { value: 'movie', children: 'Movie' },
      { value: 'ova', children: 'OVA' },
      { value: 'special', children: 'Special' },
      { value: 'ona', children: 'ONA' },
      { value: 'music', children: 'Music' },
    ],
    status: [
      { value: 'airing', children: 'Airing' },
      { value: 'complete', children: 'Complete' },
      { value: 'upcoming', children: 'Upcoming' },
    ],
    rating: [
      { value: 'g', children: 'G - All Ages' },
      { value: 'pg', children: 'PG - Children' },
      { value: 'pg13', children: 'PG-13 - Teens 13 or older' },
      { value: 'r17', children: 'R - 17+ (violence & profanity)' },
      { value: 'r', children: 'R+ - Mild Nudity' },
      { value: 'rx', children: 'Rx - Hentai' },
    ],
  },

  manga: {
    order_by: [
      { value: 'title', children: 'Title' },
      { value: 'score', children: 'Score' },
      { value: 'scored_by', children: 'Scored by' },
      { value: 'popularity', children: 'Popularity' },
      { value: 'members', children: 'Members' },
      { value: 'favorites', children: 'Favorites' },
      { value: 'rank', children: 'Rank' },
      { value: 'volumes', children: 'Volumes' },
      { value: 'chapters', children: 'Chapters' },
      { value: 'start_date', children: 'Start date' },
      { value: 'end_date', children: 'End date' },
    ],
    type: [
      { value: 'manga', children: 'Manga' },
      { value: 'novel', children: 'Novel' },
      { value: 'lightnovel', children: 'Lightnovel' },
      { value: 'oneshot', children: 'Oneshot' },
      { value: 'doujin', children: 'Doujin' },
      { value: 'manhwa', children: 'Manhwa' },
      { value: 'manhua', children: 'Manhua' },
    ],
    status: [
      { value: 'publishing', children: 'Publishing' },
      { value: 'complete', children: 'Complete' },
      { value: 'hiatus', children: 'Hiatus' },
      { value: 'discontinued', children: 'Discontinued' },
      { value: 'upcoming', children: 'Upcoming' },
    ],
  },
}

const notes = 9
for (let i = 1; i <= notes; i++) {
  searchValues.scoreMin.push({ value: i, children: i })
}

export { searchValues }
