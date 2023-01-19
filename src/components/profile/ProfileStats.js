import { capFirstLetter } from '../../utils/helper'
import { Box, CircleIcon, Container, Divider, Typography } from '../ui'
import { Stat } from './Stat'

const ProfileStats = ({ stats, type }) => {
  const totalStats = sumOfStats(stats)
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
            <CircleIcon sx={{ color: stat.color }} key={stat.name + key} />
            <Stat name={stat.name} number={stat.number} key={key} />
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

const sumOfStats = (stats) => {
  return stats
    .map((stat) => stat.number)
    .reduce((total, actual) => actual + total)
}

export { ProfileStats }
