import { Container, Typography } from '../ui'
import { Link } from 'react-router-dom'
import { getUrl } from '../../utils/helper'
import { PROFILE } from '../../commons/constants'

const Stat = ({ name, number, type, props }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...props,
      }}
    >
      <Typography variant="body1">
        {name !== 'Total Entries' ? (
          <Link
            to={getUrl([PROFILE, type, name.toLowerCase()])}
            sx={{ cursor: 'pointer' }}
          >
            {name}
          </Link>
        ) : (
          name
        )}
      </Typography>
      <Typography variant="body1">{number}</Typography>
    </Container>
  )
}

export { Stat }
