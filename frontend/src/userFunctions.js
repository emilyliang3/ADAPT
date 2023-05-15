import { doc, setDoc } from 'firebase/firestore';
import { db, getUser } from './firebaseFunctions.js';

export const updateWeight = (userWeight) => {
    const user = getUser();
    // try catches user is null error
    // userinfo page should be restricted to logged in users only (not implemented yet) so user should never be null 
    try {
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, { weight: userWeight}, { merge: true });
        return userWeight;
    } catch (error) {
        console.error(error.message);
    }
};