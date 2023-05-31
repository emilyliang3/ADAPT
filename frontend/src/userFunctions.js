import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseFunctions.js';

export const updateUserField = (user, field, newValue) => {
    // try catches user is null error
    // userinfo page should be restricted to logged in users only (not implemented yet) so user should never be null 
    try {
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, { [field]: newValue}, { merge: true });
        return newValue;
    } catch (error) {
        console.error(error.message);
    }
};

export async function getUserField(user, field) {
    try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const fieldData = userDoc.data()[field];
            return fieldData;
        }
        else {
            console.error("user doc doesn't exist")
        }
    } catch (error) {
        console.error(error.message);
    }
};

export function calculateBMI(heightInInches, weightInPounds) {

// Convert height to meters
    const heightInMeters = heightInInches * 0.0254;

// Convert weight to kilograms
    const weightInKilograms = weightInPounds * 0.45359237;

// Calculate BMI
    const bmi = weightInKilograms / (heightInMeters * heightInMeters);

// Return BMI rounded to two decimal places
    return bmi.toFixed(2); 
  }

export async function calculateUserBMI(user) {
  const height = await getUserField(user, 'height');
  const weight = await getUserField(user, 'weight');

  if (height && weight) {
    const bmi = calculateBMI(height, weight);
    return bmi;
  }

}
