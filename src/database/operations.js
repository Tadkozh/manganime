import {
  collection,
  doc,
  getDoc,
  query, setDoc,
  where
} from 'firebase/firestore'
import { USER_COLLECTION } from '../commons/constants'
import { db } from '../firebase-config'

const getUser = async (id) => {
  try {
    const q = query(collection(db, USER_COLLECTION), where('id', '==', id))
    const queySnapshot = await getDoc(q)

    let data
    queySnapshot.forEach((doc) => {
      data = doc.data()
    })
    return data
  } catch (e) {
    console.log('getUser error :', e)
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
  console.log('user', user)

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
    console.log('addUser error :', e)
  }
}

export { getUser, createUser }

