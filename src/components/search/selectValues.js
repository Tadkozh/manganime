const selectValues = {
  type: [
    { value: 'tv', children: 'Serie' },
    { value: 'movie', children: 'Movie' },
    { value: 'ova', children: 'OVA' },
    { value: 'special', children: 'Special' },
    { value: 'ona', children: 'ONA' },
    { value: 'music', children: 'Music' },
  ],
  scoreMin: [
    { value: '1', children: '1' },
    { value: '2', children: '2' },
    { value: '3', children: '3' },
    { value: '4', children: '4' },
    { value: '5', children: '5' },
    { value: '6', children: '6' },
    { value: '7', children: '7' },
    { value: '8', children: '8' },
    { value: '9', children: '9' },
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
}

export default selectValues
