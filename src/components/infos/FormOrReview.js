import { useState, useEffect, useMemo } from 'react'
import { getTypeOpinion, getTypeId } from '../../database/user'

import InfoForm from './InfoForm'
import YourReview from './YourReview'

function FormOrReview({ info, user }) {
  const [editForm, setEditForm] = useState(false)
  const [formNoteValue, setFormNoteValue] = useState()
  const [formTitleValue, setFormTitleValue] = useState()
  const [formCommentValue, setFormCommentValue] = useState()

  const type_opinion = getTypeOpinion(info?.type)
  const type_id = getTypeId(info?.type)

  const searchBySome = user[type_opinion].some(
    (opinion) => opinion[type_id] === info?.id,
  )
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

  return userOpinion ? (
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
  )
}

export default FormOrReview
