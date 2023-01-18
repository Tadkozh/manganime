import { Container, Typography, Divider, CircleIcon, Box } from '../ui'

const ProfileStats = ({ stats, type }) => {
  const totalStats = sumOfStats(stats)
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6">{type} Stats</Typography>
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
          props={{ mx: -1, my: 1 }}
        />
      </Container>
    </Box>
  )
}

const Stat = ({ name, number, props }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...props,
      }}
    >
      <Typography variant="body1">{name}</Typography>
      <Typography variant="body1">{number}</Typography>
    </Container>
  )
}

const sumOfStats = (stats) => {
  return stats
    .map((stat) => stat.number)
    .reduce((total, actual) => actual + total)
}

export { ProfileStats, Stat }
