import { firebaseConfig } from './config.js'
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();



function signedIn(){
    //modify to return true when signed in and false when not
    return true
}
const signUpWithEmail = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        setDoc(doc(db, "users", userCredential.user.uid), {
            email: email,
            password: password
        });
    })
};

const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
    .then((userCredential) => {
        setDoc(doc(db, "users", userCredential.user.uid), {
            email: userCredential.user.email
        }, { merge: true });
    })

};



export { signUpWithEmail, signInWithGoogle };
