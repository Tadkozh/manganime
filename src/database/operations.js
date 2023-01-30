import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { DATABASE_COLLECTION } from '../commons/constants'
import { db, getUid } from '../firebase-config'

const getDocUser = (uid) => doc(collection(db, DATABASE_COLLECTION.USERS), uid)

const getUser = (data) => ({
  email: data.email,
  bio: data?.bio ?? '',
  picture: data?.picture ?? '',
  name: data?.name ?? 'user',
  favorite_anime: data?.favorite_anime ?? [],
  favorite_manga: data?.favorite_manga ?? [],
  anime_opinion: data?.anime_opinion ?? [],
  manga_opinion: data?.manga_opinion ?? [],
  stats: data?.stats ?? [],
})

const addUser = async (user) => {
  const docUser = getDocUser(getUid())
  const userToAdd = getUser(user)
  try {
    await setDoc(docUser, userToAdd)
  } catch (error) {
    throw new Error(`${addUser.name} error:${error.message}`)
  }
}

const updateUser = async (user) => {
  const docUser = getDocUser(getUid())
  try {
    await updateDoc(docUser, user)
  } catch (error) {
    throw new Error(`${updateUser.name} error:${error.message}`)
  }
}

const deleteUser = async () => {
  const docUser = getDocUser(getUid())
  try {
    await deleteDoc(docUser)
  } catch (error) {
    throw new Error(`${deleteUser.name} error:${error.message}`)
  }
}

const getUserById = async () => {
  const docUser = getDocUser(getUid())
  try {
    const docSnap = await getDoc(docUser)
    const user = docSnap.data()
    return user
  } catch (error) {
    throw new Error(`${getUserById.name} error:${error.message}`)
  }
}

export { addUser, updateUser, deleteUser, getUserById }
