import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { USER_COLLECTION } from '../commons/constants'
import { db } from '../firebase-config'

const getUserByUid = async (uid) => {
  try {
    const docRef = doc(collection(db, USER_COLLECTION), uid)
    const docSnap = await getDoc(docRef)
    const user = docSnap.data()
    return user
  } catch (e) {
    throw new Error('addUser operation fail')
  }
}

const createUser = (data) => {
  const user = {
    uid: data.uid,
    email: data.email,
    picture: data?.picture ?? '',
    name: data?.name ?? 'user',
    favorite_anime: data?.favorite_anime ?? [],
    favorite_manga: data?.favorite_manga ?? [],
    anime_opinion: data?.anime_opinion ?? [],
    manga_opinion: data?.manga_opinion ?? [],
  }
  addUser(user)
}

// todo : modifier pour la fusion (update)
const addUser = async (user) => {
  try {
    const docUser = doc(collection(db, USER_COLLECTION), user.uid)

    await setDoc(docUser, {
      email: user.email,
      picture: user.picture,
      name: user.name,
      favorite_anime: user.favorite_anime,
      favorite_manga: user.favorite_manga,
      anime_opinion: user.anime_opinion,
      manga_opinion: user.manga_opinion,
    })
  } catch (e) {
    throw new Error(`addUser operation fail ${e}`)
  }
}

export { getUserByUid, createUser }
