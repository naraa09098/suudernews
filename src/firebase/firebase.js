import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyB7_oNYrDiRBo65H3buzvuTRgBJPGy5VMI",
    authDomain: "suudernews.firebaseapp.com",
    projectId: "suudernews",
    storageBucket: "suudernews.firebasestorage.app",
    messagingSenderId: "638434908489",
    appId: "1:638434908489:web:4fd10921a6a75e64e32298",
    measurementId: "G-FCDT30QVEM"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)