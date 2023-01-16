import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { USER_COLLECTION } from '../commons/constants'
import { db } from '../firebase-config'

const getUserByUid = async (uid) => {
  try {
    const q = query(collection(db, USER_COLLECTION), where('uid', '==', uid))
    const querySnapshot = await getDocs(q)

    let user = null
    querySnapshot.forEach((doc) => {
      user = doc.data()
    })
    return user
  } catch (e) {
    throw new Error('addUser operation fail')
  }
}

const createUser = (data) => {
  const user = {
    uid: data.uid,
    token: data.accessToken,
    email: data.email,
    picture: data?.picture ?? '',
    name: data?.name ?? 'user',
    favorite_anime: data?.favorite_anime ?? [],
    favorite_manga: data?.favorite_manga ?? [],
    anime_opinion: [],
    manga_opinion: [],
  }
  addUser(user)
}

// todo : modifier pour la fusion (update)
const addUser = async (user) => {
  try {
    const docUser = doc(collection(db, USER_COLLECTION))

    await setDoc(docUser, {
      uid: user.uid,
      token: user.token,
      email: user.email,
      picture: user.picture,
      name: user.name,
      favorite_anime: user.favorite_anime,
      favorite_manga: user.favorite_manga,
      anime_opinion: user.anime_opinion,
      manga_opinion: user.manga_opinion,
    })
  } catch (e) {
    throw new Error('addUser operation fail')
  }
}

export { getUserByUid, createUser }
