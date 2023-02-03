import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useInfos } from '../../hooks/queriesHooks'

import { useEffect, useMemo, useState } from 'react'

import { Box, Button, Grid } from '../ui'

// Constants
import { ANIME } from '../../commons/constants'

// Components
import { getTypeId, getTypeOpinion } from '../../database/user'
import NavBarInfo from '../NavBarInfo'
import InfoDetails from './InfoDetails'
import InfoForm from './InfoForm'
import InfoPresentation from './InfoPresentation'
import InfoReviews from './InfoReviews'
import InfoSynopsis from './InfoSynopsis'
import YourReview from './YourReview'

function Infos() {
  const { data: authUser } = useAuth()

  let { type, id } = useParams()
  const data = useInfos(type, id)
  const info = data?.Page?.media[0]

  return (
    info && (
      <>
        <NavBarInfo />
        <Box
          component={'img'}
          src={info?.bannerImage}
          sx={{
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover',
            height: '400px',
            width: '100%',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          container
          sx={{
            p: 1,
          }}
        >
          <Grid item xs={12} lg={3} xl={3} sx={{ my: 'auto', mt: '-5%' }}>
            <InfoPresentation info={info} />
          </Grid>
          <Grid item xs={12} lg={8} xl={8}>
            <InfoSynopsis synopsis={info?.description} title={info?.title} />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            p: 1,
          }}
        >
          <Grid item xs={12} lg={3} xl={3}>
            <InfoDetails info={info} />
          </Grid>
          <Grid item xs={12} lg={8} xl={8} sx={{ height: 'fit-content' }}>
            {type === ANIME && <Trailer info={info?.trailer} />}
            <Reviews info={info} user={authUser} />
          </Grid>
        </Grid>
      </>
    )
  )
}

const Reviews = ({ info, user }) => {
  const [editForm, setEditForm] = useState(false)
  const [formNoteValue, setFormNoteValue] = useState()
  const [formTitleValue, setFormTitleValue] = useState()
  const [formCommentValue, setFormCommentValue] = useState()

  const type_opinion = getTypeOpinion(info?.type)
  const type_id = getTypeId(info?.type)

  const searchBySome = user[type_opinion].some(
    (opinion) => opinion[type_id] === info?.id,
  )
  console.log(searchBySome)
  const searchByIndex = user[type_opinion].findIndex(
    (opinion) => opinion[type_id] === info?.id,
  )
  const userOpinion = useMemo(
    () => (editForm ? false : searchBySome),
    [editForm, searchBySome],
  )

  useEffect(() => {
    const actualNote = user[type_opinion][searchByIndex]?.comments[0]?.note
    const actualTitle = user[type_opinion][searchByIndex]?.comments[0]?.title
    const actualComment =
      user[type_opinion][searchByIndex]?.comments[0]?.message

    setFormTitleValue(actualTitle)
    setFormCommentValue(actualComment)
    setFormNoteValue(actualNote)
  }, [user, searchByIndex, type_opinion])
  return (
    <>
      <>
        {userOpinion ? (
          <YourReview info={info} setEditForm={setEditForm} />
        ) : (
          <InfoForm
            info={info}
            editForm={editForm}
            setEditForm={setEditForm}
            formNoteValue={formNoteValue}
            formTitleValue={formTitleValue}
            formCommentValue={formCommentValue}
          />
        )}
      </>
      <InfoReviews />
    </>
  )
}

function Trailer({ info }) {
  return (
    info && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
        }}
      >
        <iframe
          title="Trailer"
          src={`https://www.youtube.com/embed/${info.id}`}
          thumbnail={info.thumbnail}
          style={{
            width: '100%',
            maxWidth: '800px',
            aspectRatio: '3/2',
            margin: '0 auto',
          }}
        />
        <Button
          variant="outlined"
          size="small"
          href={`https://www.youtube.com/watch?v=${info.id}`}
          target="_blank"
          rel="noreferrer"
          sx={{ width: 'fit-content', m: 2, p: 1 }}
        >
          Watch trailer on {info.site}
        </Button>
      </Box>
    )
  )
}

export default Infos
