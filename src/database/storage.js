import { storage } from '../firebase-config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const uploadFile = async (file) => {
  const storageRef = ref(storage, `/images/${file.name}`)
  let url = null

  await uploadBytes(storageRef, file).then(async (snapshot) => {
    await getDownloadURL(snapshot.ref).then((newUrl) => {
      url = newUrl
    })
  })
  return url
}
