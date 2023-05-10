import { firebaseConfig } from './config.js'
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const signUpWithEmail = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential.user.uid);
        setDoc(doc(db, "users", userCredential.user.uid), {
            email: email,
            password: password
        });
    })
    console.log("sgned up");
};

export { signUpWithEmail };
