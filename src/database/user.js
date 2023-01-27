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
  const type_opinion = type === 'anime' ? 'anime_opinion' : 'manga_opinion'
  const type_id = type === 'anime' ? 'anime_id' : 'manga_id'

  // console.log('type', type)
  // console.log('type_id', type_id)
  // console.log('type_opinion', type_opinion)

  const fullComment = {
    create_at: new Date().toISOString(),
    title: comment.title,
    message: comment.comment,
  }
  const commentArray = []
  commentArray.push(fullComment)

  // console.log('commentArray', commentArray)
  // console.log('fullComment', fullComment)
  // console.log('info', info)

  const isItemId = newUserComment[type_opinion].some(
    (opinion) => opinion[type_id] === info.mal_id,
  )
  if (isItemId) {
    // S'il y a un anime avec le même numéro...
    newUserComment[type_opinion].map((opinion, key) => {
      //... On détermine lequel
      // console.log('opinion', opinion)
      if (opinion[type_id] === info.mal_id) {
        // Dans cet anime...
        let newOpinion
        if (!opinion?.comments) {
          // ...S'il n'y a pas de zone commentaire, on la crée
          newOpinion = { ...opinion, comments: [fullComment] } // et on la remplit (tout en préservant rate : spread operator)

          newUserComment[type_opinion][key] = newOpinion
        } else {
          //Si une zone commentaire existe déjà
          newUserComment[type_opinion][key].comments.push(fullComment) // on ajoute le nouveau commentaire aux précédents
        }
      }
    })
  } else {
    // si anime pas encore traité, recréer tout (forcément, pas de rate)
    const commentdb = {
      [type_id]: info.mal_id,
      comments: commentArray,
    }
    newUserComment[type_opinion].push(commentdb)
  }

  console.log('newUserComment', newUserComment)
  updateUserCurrent(newUserComment)
}

const updateRating = (type, info, rating, user) => {
  const newUserRate = structuredClone(user)
  const type_opinion = type === 'anime' ? 'anime_opinion' : 'manga_opinion'
  const type_id = type === 'anime' ? 'anime_id' : 'manga_id'

  const isItemId = newUserRate[type_opinion].some(
    (opinion) => opinion[type_id] === info.mal_id,
  )
  if (isItemId) {
    newUserRate[type_opinion].map((opinion, key) => {
      if (opinion[type_id] === info.mal_id) {
        // Dans cet anime...
        let newOpinion
        if (!opinion?.rate) {
          // ...S'il n'y a pas de zone rate, on la crée
          newOpinion = { ...opinion, rate: rating } // et on la remplit (tout en préservant les commentaires : spread operator)

          newUserRate[type_opinion][key] = newOpinion
        } else {
          //Si une zone rate existe déjà
          opinion.rate = rating // on écrase la rate précédente
        }
      }
    })
  } else {
    // si anime pas encore traité, recréer tout (forcément, pas de commentaire)
    const ratedb = { rate: rating, [type_id]: info.mal_id }
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
  const favorite_type = type === 'anime' ? 'favorite_anime' : 'favorite_manga'

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
