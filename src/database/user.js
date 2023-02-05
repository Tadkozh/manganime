// import { ManageHistoryRounded } from '@mui/icons-material'
import { addUser, getUserById, updateUser } from './operations'
import { deleteFile, uploadFile } from './storage'
import { arrayRemove, arrayUnion } from 'firebase/firestore'
import { ANIME } from '../commons/constants'

const updateProfileUser = (user, userCurrent) => {
  const newUser = structuredClone(userCurrent)
  newUser.email = user.email
  newUser.password = user.password
  newUser.name = user.name
  return newUser
}

const updateComment = async (
  user,
  info,
  note,
  comment,
  setEditForm,
  commentTitle,
  commentValue,
) => {
  const newUserComment = structuredClone(user)
  const type_opinion = getTypeOpinion(info?.type)
  const type_id = getTypeId(info?.type)

  const itemIndex = newUserComment[type_opinion].findIndex(
    (opinion) => opinion[type_id] === info.id,
  )

  if (itemIndex === -1) {
    const commentdb = {
      [type_id]: info.id,
      comments: [
        {
          create_at: new Date().toISOString(),
          note,
          title: comment.title,
          message: comment.comment,
        },
      ],
    }

    newUserComment[type_opinion].push(commentdb)
    updateUserCurrent(newUserComment)
  } else {
    const editedComment = {
      create_at: newUserComment[type_opinion][itemIndex].comments[0].create_at,
      note,
      title: commentTitle,
      message: commentValue,
    }

    newUserComment[type_opinion][itemIndex].comments[0] = editedComment
    updateUserCurrent(newUserComment)
  }

  setEditForm(false)

  return getUserById()
}

async function deleteComment(user, info, type_opinion, type_id) {
  const comments = structuredClone(user[type_opinion])
  const index = comments.findIndex((anime) => anime[type_id] === info.id)

  updateUserCurrent({ [type_opinion]: arrayRemove(comments[index]) })

  return getUserById()
}

const updateStat = async (name, infos, user) => {
  const newUserStat = structuredClone(user)
  const userStats = newUserStat?.stats
  const newStat = { name: name, animeId: [], mangaId: [] }
  const idContent = infos?.type === 'ANIME' ? 'animeId' : 'mangaId'
  const isNameStatExist = userStats?.some((array) => array?.name === name)
  const getOtherNameStatWithContentId = userStats?.find(
    (stat) => stat.name !== name && stat[idContent]?.includes(infos?.id),
  )

  if (userStats?.length === 0 || !isNameStatExist) {
    userStats?.push(newStat)
  }
  if (getOtherNameStatWithContentId) {
    userStats
      ?.find(
        (stat) => stat?.name !== name && stat[idContent]?.includes(infos?.id),
      )
      [idContent]?.splice(
        getOtherNameStatWithContentId[idContent]?.indexOf(infos?.id),
        1,
      )
  } else {
  }

  userStats?.find((array) => array?.name === name)[idContent]?.push(infos?.id)
  updateUserCurrent(newUserStat)
  return getUserById()
}

const updateBio = async (bio, user) => {
  if (bio === user.bio) {
    return
  }
  updateUserCurrent({ bio })
  return getUserById()
}

const userPicture = async (picture, user) => {
  const isDelete = await deleteFile(user.picture)
  if (isDelete) {
    const url = await uploadFile(picture)
    updateUserCurrent({ picture: url })
  }

  return getUserById()
}

const updateFavorite = async (info, user) => {
  const typeFavorite = getTypeFavourite(info.type)
  const favorites = structuredClone(user[typeFavorite])
  const isExist = favorites.some((id) => id === info.id)
  console.log('isExist', isExist)
  updateUserCurrent(
    isExist
      ? { [typeFavorite]: arrayRemove(info.id) }
      : { [typeFavorite]: arrayUnion(info.id) },
  )
  return getUserById()
}

const storeUser = (data) => {
  if (data != null) {
    addUser(data.user)
  }
}

const updateUserCurrent = async (newUser) => {
  await updateUser(newUser)
}

const getUserbyUid = async () => {
  const user = await getUserById()
  return user
}
const getTypeFavourite = (type) =>
  type === ANIME.toUpperCase() ? 'favorite_anime' : 'favorite_manga'

const getTypeOpinion = (type) =>
  type === ANIME.toUpperCase() ? 'anime_opinion' : 'manga_opinion'

const getTypeId = (type) =>
  type === ANIME.toUpperCase() ? 'anime_id' : 'manga_id'

export {
  updateBio,
  userPicture,
  updateProfileUser,
  updateUserCurrent,
  updateFavorite,
  updateComment,
  deleteComment,
  updateStat,
  getUserbyUid,
  getTypeFavourite,
  getTypeId,
  getTypeOpinion,
  storeUser,
}
