import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'
import { storage } from '../firebase-config'

export const uploadFile = async (file) => {
  const storageRef = ref(storage, `/images/${file.name}`)
  await uploadBytes(storageRef, file)

  return file.name
}

export const downloadFile = async (picture) => {
  const storageRef = ref(storage, `/images/${picture}`)

  return await getDownloadURL(storageRef)
    .then((url) => {
      return url
    })
    .catch((error) => {
      throw new Error(`Error ${downloadFile.name} : ${error}`)
    })
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
