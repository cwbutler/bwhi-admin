import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBO3sJWuQBKiyNbKHjUt4Dj3DRfGQIPGts",
    authDomain: "ooot-bwhi.firebaseapp.com",
    projectId: "ooot-bwhi",
    storageBucket: "ooot-bwhi.appspot.com",
    messagingSenderId: "649790097367",
    appId: "1:649790097367:web:d052e30a30360a963b6d92",
    measurementId: "G-5DR3H23HBD"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
// export const analytics = getAnalytics(app);

export default { app, auth, db, storage };

export async function uploadFileToStorage({ path, file }) {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file, { contentType: file.type });
    return await getDownloadURL(snapshot.ref);
}
