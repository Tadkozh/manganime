import { useParams } from 'react-router-dom'
import { INFOS } from '../../commons/constants'
import { useRecommendations, useTitle } from '../../hooks/queriesHooks'
import { ArrowRightSharp, Box, Typography } from './../ui'
// import { useTheme } from '@mui/material'

// Components
import NavBarInfo from '../NavBarInfo'
import { CardImage } from '../ui/CardImage'

const Recommendations = () => {
  let { type, id } = useParams()

  const dataInfo = useTitle(type, id)
  const title =
    dataInfo?.Page?.media[0]?.title?.english ??
    dataInfo?.Page?.media[0]?.title?.romaji

  const data = useRecommendations(type, id)

  let directives = ''
  if (data?.Page?.recommendations.length === 0) {
    directives = `No recommendation currently.`
  } else {
    directives = (
      <>
        <Typography
          sx={{
            marginBottom: 5,
            display: 'flex',
            alignItem: 'center',
          }}
        >
          <ArrowRightSharp />
          Click on the image to see the card
        </Typography>
      </>
    )
  }

  return (
    <>
      <NavBarInfo />

      <Box sx={{ padding: 6 }}>
        <Typography variant="h4" component="h2">
          People who like {title} also enjoy
        </Typography>
        {directives}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 225px)',
            justifyContent: 'center',
            justifyItems: 'center',
            gap: '50px',
          }}
        >
          {data
            ? data?.Page?.recommendations.map((data, index) => {
                return (
                  <CardImage
                    type={type}
                    route={INFOS}
                    data={data.media}
                    key={index}
                  />
                )
              })
            : /* <ListCardsSkeleton dimension={{ width: 225, height: 335 }} /> */
              'loading, please wait...'}
        </Box>
      </Box>
    </>
  )
}
export default Recommendations
