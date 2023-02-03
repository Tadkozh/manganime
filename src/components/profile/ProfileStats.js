import { capFirstLetter } from '../../utils/helper'
import {
  blue,
  Box,
  CircleIcon,
  Container,
  Divider,
  green,
  grey,
  red,
  Typography,
  yellow,
} from '../ui'
import { Stat } from './Stat'
import { ANIME } from '../../commons/constants'

const statsColor = [
  {
    color: green[500],
  },
  {
    color: blue[500],
  },
  {
    color: yellow[500],
  },
  {
    color: red[500],
  },
  {
    color: grey[500],
  },
]

const sumOfStats = (stats, arrayType) => {
  return stats
    .map((stat) => stat[arrayType].length)
    .reduce((total, actual) => actual + total)
}

const ProfileStats = ({ stats, type }) => {
  const arrayType = type === ANIME ? 'animeId' : 'mangaId'
  const totalStats = sumOfStats(stats, arrayType)
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6">{capFirstLetter(type)} Stats</Typography>
      <Divider />
      <Container>
        {stats.map((stat, key) => (
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              m: 1,
            }}
            key={stat.name}
          >
            <CircleIcon
              sx={{ color: statsColor[key].color }}
              key={stat.name + key}
            />
            <Stat
              name={stat.name}
              number={stat[arrayType].length}
              key={key}
              type={type}
              forList
            />
          </Container>
        ))}
        <Stat
          name={'Total Entries'}
          number={totalStats}
          props={{ mx: -2, my: 3 }}
        />
      </Container>
    </Box>
  )
}

export { ProfileStats }
