import { useTheme } from '@mui/material'
import { Box, Typography } from './ui'
import { ListCardsSkeleton } from './skeletons/CardImageSkeleton'
import { useTrend } from './../hooks/queriesHooks'

import { CardImage } from './ui/CardImage'

import { INFOS } from './../commons/constants'

const Trending = ({ type }) => {
  const theme = useTheme()
  const data = useTrend(type)

  console.log(data?.Page?.media)
  console.log(type)

  return (
    <>
      <Box sx={{ padding: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginLeft: '1em',
            textShadow: `${theme.palette.background.topIcon} 1px 0 0`,
          }}
        >
          Trending {type}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 225px)',
            justifyContent: 'center',
            justifyItems: 'center',
            gap: '50px',
          }}
        >
          {data ? (
            data?.Page?.media.map((data, index) => {
              if (index < 12) {
                return (
                  <CardImage
                    type={type}
                    route={INFOS}
                    data={data}
                    key={index}
                  />
                )
              }
              return null
            })
          ) : (
            <ListCardsSkeleton dimension={{ width: 225, height: 335 }} />
          )}
        </Box>
      </Box>
    </>
  )
}

export default Trending