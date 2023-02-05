import {
  deleteObject, getDownloadURL,
  ref,
  uploadBytes
} from 'firebase/storage'
import { storage } from '../firebase-config'

export const uploadFile = async (file) => {
  const storageRef = ref(storage, `/images/${file.name}`)
  return await uploadBytes(storageRef, file).then((snapshot) =>
    getDownloadURL(snapshot.ref).then((url) => {
      return url
    }),
  )
}


export const deleteFile = async (picture) => {
  const storageRef = ref(storage, `/images/${picture}`)
  return deleteObject(storageRef)
    .then(() => {
      return true
    })
    .catch((error) => {
      throw new Error(`Error ${deleteFile.name} : ${error}`)
    })
}
