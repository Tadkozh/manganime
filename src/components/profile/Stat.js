import { Container, Typography } from '../ui'

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

export { Stat }
