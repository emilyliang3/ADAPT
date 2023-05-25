import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseFunctions.js';

//Extract the data from workout firebase 
export async function getWorkoutData(workouts_id) {
    try {
        const ref = doc(db, "workouts", workouts_id);
        const workoutDoc = await getDoc(ref);
        if (workoutDoc.exists()) {
            const workoutData = {
                name: workoutDoc.data()["name"],//has to modify after database created 
                LowerBody: workoutDoc.data()["lower body"],
                UpperBody: workoutDoc.data()["upper body"],
                Compond: workoutDoc.data()["Compond"],
                Instructions: workoutDoc.data()["instruction"],
                Glutes: workoutDoc.data()["Glutes"],
                Core: workoutDoc.data()["Core"],
                Cardio: workoutDoc.data()["Cardio"],
            };
            return workoutData;
        }
        else {
            console.error("recipe doc doesn't exist")
        }
    } catch (error) {
        console.error(error.message);
    }
};