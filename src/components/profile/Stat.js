import { Container, Typography } from '../ui'
import { Link } from 'react-router-dom'
import { getUrl } from '../../utils/helper'
import { PROFILE } from '../../commons/constants'

const Stat = ({ name, number, type, forList = false, props }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...props,
      }}
    >
      {forList ? (
        <>
          <Typography
            variant="body1"
            sx={{
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <Link
              to={getUrl([PROFILE, type, name.toLowerCase()])}
              style={{
                cursor: 'pointer',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {name}
            </Link>
          </Typography>
          <Typography variant="body1">{number}</Typography>
        </>
      ) : (
        <>
          <Typography variant="body1">{name}</Typography>
          <Typography variant="body1">{number}</Typography>
        </>
      )}
    </Container>
  )
}

export { Stat }
