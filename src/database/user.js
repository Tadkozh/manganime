import { addUser, getUserById, updateUser } from './operations'

const updateProfileUser = (user, userCurrent) => {
  const newUser = structuredClone(userCurrent)
  newUser.email = user.email
  newUser.password = user.password
  newUser.name = user.name
  return newUser
}

const updateComment = (type, info, comment, user) => {
  const newUserComment = structuredClone(user)
  const type_opinion = type === 'ANIME' ? 'anime_opinion' : 'manga_opinion'
  const type_id = type === 'ANIME' ? 'anime_id' : 'manga_id'

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

const updateRating = (type, info, rating, user) => {
  const newUserRate = structuredClone(user)
  const type_opinion = type === 'ANIME' ? 'anime_opinion' : 'manga_opinion'
  const type_id = type === 'ANIME' ? 'anime_id' : 'manga_id'

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

const updateBio = async (bio, user) => {
  if (bio === user.bio) {
    return
  }
  const newUser = structuredClone(user)
  newUser.bio = bio
  await updateUserCurrent(newUser)
  return newUser
}

const updateFavorite = (type, info, user) => {
  const newUserFav = structuredClone(user)
  const favorite_type = type === 'ANIME' ? 'favorite_anime' : 'favorite_manga'

  const isItemId = newUserFav[favorite_type].some(
    (ItemId) => ItemId === info.id,
  )

  if (!isItemId) {
    newUserFav[favorite_type].push(info.id)
  }
  console.log('newUserFav', newUserFav)
  updateUserCurrent(newUserFav)
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
  updateProfileUser,
  updateUserCurrent,
  updateRating,
  updateFavorite,
  updateComment,
  getUserbyUid,
  storeUser,
}
