import { useAuth } from '../../context/AuthContext'
import { useParams } from 'react-router-dom'
import { useInfos } from '../../hooks/queriesHooks'

import { useEffect, useMemo, useState } from 'react'

import { Box, Button, Grid } from '../ui'

// Constants
import { ANIME } from '../../commons/constants'

// Components
import NavBarInfo from '../NavBarInfo'
import InfoPresentation from './InfoPresentation'
import InfoSynopsis from './InfoSynopsis'
import InfoDetails from './InfoDetails'
import InfoForm from './InfoForm'
import YourReview from './YourReview'
import InfoReviews from './InfoReviews'

function Infos() {
  const { data: authUser, setData: setAuthUser } = useAuth()
  const newUserComment = structuredClone(authUser)

  let { type, id } = useParams()
  const data = useInfos(type, id)
  const info = data?.Page?.media[0]

  const [editForm, setEditForm] = useState(false)
  const [formNoteValue, setFormNoteValue] = useState()
  const [formTitleValue, setFormTitleValue] = useState()
  const [formCommentValue, setFormCommentValue] = useState()

  const type_opinion =
    info?.type === 'ANIME' ? 'anime_opinion' : 'manga_opinion'

  const type_id = info?.type === 'ANIME' ? 'anime_id' : 'manga_id'

  const searchBySome = newUserComment[type_opinion].some(
    (opinion) => opinion[type_id] === info?.id,
  )
  const searchByIndex = newUserComment[type_opinion].findIndex(
    (opinion) => opinion[type_id] === info?.id,
  )

  const userOpinion = useMemo(
    () => (editForm ? false : searchBySome),
    [editForm, searchBySome],
  )

  useEffect(() => {
    const actualNote =
      newUserComment[type_opinion][searchByIndex]?.comments[0]?.note
    const actualTitle =
      newUserComment[type_opinion][searchByIndex]?.comments[0]?.title
    const actualComment =
      newUserComment[type_opinion][searchByIndex]?.comments[0]?.message

    setFormTitleValue(actualTitle)
    setFormCommentValue(actualComment)
    setFormNoteValue(actualNote)
  }, [newUserComment, searchByIndex, type_opinion])

  return (
    info && (
      <>
        <NavBarInfo />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
            maxWidth: '100%',
            padding: '10px',
          }}
        >
          <Grid container>
            <GridChild
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                m: '10px auto',
              }}
              children={<InfoPresentation info={info} />}
            />

            <GridChild
              xs={12}
              sm={6}
              md={4}
              sx={{
                order: {
                  md: '-1',
                },
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '500px',
                textAlign: 'justify',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 0 12px -5px #000',
                m: '10px auto',
              }}
              children={<InfoSynopsis synopsis={info.description} />}
            />

            <GridChild
              xs={12}
              sm={12}
              md={4}
              sx={{
                maxHeight: '500px',
                backgroundColor: 'rgba(128, 128, 128, 0.5)',
                padding: '5px 10px',
                overflowY: 'auto',
                m: '10px auto',
              }}
              children={<InfoDetails info={info} />}
            />
          </Grid>

          {type === ANIME && <Trailer info={info.trailer} />}

          {userOpinion ? (
            <YourReview
              user={authUser}
              setUser={setAuthUser}
              newUserComment={newUserComment}
              info={info}
              type_opinion={type_opinion}
              type_id={type_id}
              editForm={editForm}
              setEditForm={setEditForm}
            />
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
          <InfoReviews />
        </Box>
      </>
    )
  )
}

function GridChild({ xs, sm, md, sx, children }) {
  return (
    <Grid item xs={xs} sm={sm} md={md} sx={sx}>
      {children}
    </Grid>
  )
}

function Trailer({ info }) {
  return (
    info && (
      <>
        <Button
          href={`https://www.youtube.com/watch?v=${info.id}`}
          target="_blank"
          rel="noreferrer"
        >
          Watch trailer on {info.site}
        </Button>
        <iframe
          title="Trailer"
          src={`https://www.youtube.com/embed/${info.id}?autoplay=1&mute=1`}
          thumbnail={info.thumbnail}
          style={{
            width: '100%',
            maxWidth: '800px',
            aspectRatio: '3/2',
            margin: '0 auto',
          }}
        />
      </>
    )
  )
}

export default Infos
