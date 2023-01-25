import { getUid } from '../firebase-config'
import { addUser, getUserById, updateUser } from './operations'

const updateProfileUser = (user, userCurrent) => {
  const newUser = structuredClone(userCurrent)
  newUser.email = user.email
  newUser.password = user.password
  newUser.name = user.name
  return newUser
}

const updateRating = (type, info, rating, user) => {
  const newUser = structuredClone(user)
  const type_opinion = type === 'anime' ? 'anime_opinion' : 'manga_opinion'
  const type_id = type === 'anime' ? 'anime_id' : 'manga_id'

  const isItemId = newUser[type_opinion].some(
    (opinion) => opinion[type_id] === info.mal_id,
  )
  if (isItemId) {
    newUser[type_opinion].foreach((opinion) => {
      if (opinion[type_id] === info.mal_id) {
        opinion.rate = rating
      }
    })
  } else {
    const ratedb = { rate: rating, [type_id]: info.mal_id }
    newUser[type_opinion].push(ratedb)
  }
  console.log('newUser', newUser)
  updateUserCurrent(newUser)
}

const updateFavorite = (type, info, user) => {
  const newUserFav = structuredClone(user)
  const favorite_type = type === 'anime' ? 'favorite_anime' : 'favorite_manga'
  const type_id = type === 'anime' ? 'anime_id' : 'manga_id'
  console.log('user', user)
  console.log('id', info.mal_id)

  const isItemId = newUserFav[favorite_type].some(
    (ItemId) => ItemId === info.mal_id,
  )

  if (!isItemId) {
    newUserFav[favorite_type].push(info.mal_id)
  }
  console.log('newUserFav', newUserFav)
  updateUserCurrent(newUserFav)
}

const storeUser = (data) => {
  if (data != null) {
    const uid = getUid()
    addUser(uid, data.user)
  }
}
const updateUserCurrent = async (newUser) => {
  const uid = getUid()
  await updateUser(uid, newUser)
}

const getUser = async (currentUser) => {
  const user = await getUserById(currentUser.uid)
  return user
}

export {
  updateProfileUser,
  updateUserCurrent,
  updateRating,
  updateFavorite,
  getUser,
  storeUser,
}
