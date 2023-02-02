// import { ManageHistoryRounded } from '@mui/icons-material'
import { addUser, getUserById, updateUser } from './operations'
import { uploadFile } from './storage'
import { arrayRemove, arrayUnion } from 'firebase/firestore'

const updateProfileUser = (user, userCurrent) => {
  const newUser = structuredClone(userCurrent)
  newUser.email = user.email
  newUser.password = user.password
  newUser.name = user.name
  return newUser
}

const updateComment = (info, comment, user) => {
  const newUserComment = structuredClone(user)
  const type_opinion = info.type === 'ANIME' ? 'anime_opinion' : 'manga_opinion'
  const type_id = info.type === 'ANIME' ? 'anime_id' : 'manga_id'

  const fullComment = {
    create_at: new Date().toISOString(),
    title: comment.title,
    message: comment.comment,
  }
  const commentArray = []
  commentArray.push(fullComment)

  const isItemId = newUserComment[type_opinion].some(
    (opinion) => opinion[type_id] === info.id,
  )
  if (isItemId) {
    newUserComment[type_opinion].map((opinion, key) => {
      if (opinion[type_id] === info.id) {
        let newOpinion
        if (!opinion?.comments) {
          newOpinion = { ...opinion, comments: [fullComment] }

          newUserComment[type_opinion][key] = newOpinion
        } else {
          newUserComment[type_opinion][key].comments.push(fullComment)
        }
      }
    })
  } else {
    const commentdb = {
      [type_id]: info.id,
      comments: commentArray,
    }
    newUserComment[type_opinion].push(commentdb)
  }

  console.log('newUserComment', newUserComment)
  updateUserCurrent(newUserComment)
}

// const getTypeId = (type) => {
//   return type === 'ANIME' ? 'anime_id' : 'manga_id'
// }
// const getTypeOpinion = (type) => {
//   return type === 'ANIME' ? 'anime_opinion' : 'manga_opinion'
// }

const updateRating = (info, rating, user) => {
  const newUserRate = structuredClone(user)
  const type_opinion = info.type === 'ANIME' ? 'anime_opinion' : 'manga_opinion'

  const type_id = info.type === 'ANIME' ? 'anime_id' : 'manga_id'

  const isItemId = newUserRate[type_opinion].some(
    (opinion) => opinion[type_id] === info.id,
  )
  if (isItemId) {
    newUserRate[type_opinion].map((opinion, key) => {
      if (opinion[type_id] === info.id) {
        let newOpinion
        if (!opinion?.rate) {
          newOpinion = { ...opinion, rate: rating }

          newUserRate[type_opinion][key] = newOpinion
        } else {
          opinion.rate = rating
        }
      }
    })
  } else {
    const ratedb = { rate: rating, [type_id]: info.id }
    newUserRate[type_opinion].push(ratedb)
  }
  console.log('newUserRate', newUserRate)
  updateUserCurrent(newUserRate)
}

const updateStat = async(name, infos, user) => {
  const newUserStat = structuredClone(user)
  const userStats = newUserStat?.stats
  console.log('user stat', userStats)
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
  // console.log('newUserStat', newUserStat)
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

const userPicture = async (picture) => {
  const url = await uploadFile(picture)
  updateUserCurrent({ picture: url })
  return getUserById()
}

const getType = (type) => {
  return type === 'ANIME' ? 'favorite_anime' : 'favorite_manga'
}
const updateFavorite = async (info, user) => {
  const typeFavorite = getType(info.type)
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

export {
  updateBio,
  userPicture,
  updateProfileUser,
  updateUserCurrent,
  updateRating,
  updateFavorite,
  updateComment,
  updateStat,
  getUserbyUid,
  storeUser,
}
