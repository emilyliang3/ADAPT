import { doc, getDoc, getDocs, collection, where, query } from 'firebase/firestore';
import { db } from './firebaseFunctions.js';

//Extract the data from workout firebase 
export async function getWorkoutData(workouts_id) {
    try {
        const ref = doc(db, "workouts", workouts_id);
        const workoutDoc = await getDoc(ref);
        if (workoutDoc.exists()) {
            const workoutData = {
                goal: workoutDoc.data()["goal"],
                muscles: workoutDoc.data()["muscles"],
                Instructions: workoutDoc.data()["instruction"],
            };
            return workoutData;
        }
        else {
            console.error("workout doc doesn't exist")
        }
    } catch (error) {
        console.error(error.message);
    }
};

export async function getQueryWorkoutsList(goalName, musclesList) {
    const workoutslist = [];
    try {
        const ref = collection(db, "workouts");
        //search through all the doc
        const q = query(ref, where("goal", "==", goalName), where("muscles", 'array-contains-any', musclesList));
        const qsnap = await getDocs(q);
        qsnap.foreach((workout) => {
            workoutslist.push(workout.id);
        });
    } catch (error) {
        console.error(error.message);
    }
    return workoutslist;
}


