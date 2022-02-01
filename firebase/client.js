import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GithubAuthProvider
} from 'firebase/auth'
import { getFirestore, Timestamp, collection, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDERAIJLTez175hmhiYKCsNmIMyXi4mC4E',
  authDomain: 'next-hol.firebaseapp.com',
  projectId: 'next-hol',
  storageBucket: 'next-hol.appspot.com',
  messagingSenderId: '369408536282',
  appId: '1:369408536282:web:e792c1a4f73c614456bfe3',
  measurementId: 'G-P39FE2W7V9'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, photoURL, uid } = user

  return {
    avatar: photoURL,
    userName: displayName,
    uid
  }
}

export const authStateChanged = (onChange) => {
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  return signInWithPopup(auth, new GithubAuthProvider())
    .then((user) => {
      const { _tokenResponse } = user
      const { displayName, photoUrl } = _tokenResponse
      return {
        avatar: photoUrl,
        userName: displayName
      }
    })
    .catch((error) => console.log(error))
}

export const addHighScore = ({ avatar, userName, highScore, uid }) => {
  return addDoc(collection(db, 'scores'), {
    avatar,
    userName,
    highScore,
    uid,
    createdAt: Timestamp.fromDate(new Date())
  })
}
