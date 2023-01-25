import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { USER_COLLECTION } from '../commons/constants'
import { db } from '../firebase-config'

const getDocUser = (uid) => doc(collection(db, USER_COLLECTION), uid)

const getUser = (data) => ({
  email: data.email,
  bios: data?.bios ?? '',
  picture: data?.picture ?? '',
  name: data?.name ?? 'user',
  favorite_anime: data?.favorite_anime ?? [],
  favorite_manga: data?.favorite_manga ?? [],
  anime_opinion: data?.anime_opinion ?? [],
  manga_opinion: data?.manga_opinion ?? [],
})

const addUser = async (uid, user) => {
  const docUser = getDocUser(uid)
  const userToAdd = getUser(user)
  try {
    await setDoc(docUser, userToAdd)
  } catch (error) {
    throw new Error(`${addUser.name} error:${error.message}`)
  }
}

const updateUser = async (uid, user) => {
  const docUser = getDocUser(uid)
  const userToUpdate = getUser(user)
  try {
    await updateDoc(docUser, userToUpdate)
  } catch (error) {
    throw new Error(`${updateUser.name} error:${error.message}`)
  }
}
const deleteUser = async (uid) => {
  const docUser = getDocUser(uid)
  try {
    await deleteDoc(docUser)
  } catch (error) {
    throw new Error(`${deleteUser.name} error:${error.message}`)
  }
}

const getUserById = async (uid) => {
  const docUser = getDocUser(uid)
  try {
    const docSnap = await getDoc(docUser)
    const user = docSnap.data()
    return user
  } catch (error) {
    throw new Error(`${getUserById.name} error:${error.message}`)
  }
}

export { addUser, updateUser, deleteUser, getUserById }
