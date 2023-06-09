import { doc, getDoc, getDocs, collection, where, query } from 'firebase/firestore';
import { db } from './firebaseFunctions.js';

//Extract the data from workout firebase 
export async function getWorkoutData(workouts_id) {
    try {
        const ref = doc(db, "workouts", workouts_id);
        const workoutDoc = await getDoc(ref);
        if (workoutDoc.exists()) {
            const workoutData = {
                name: workoutDoc.data()["name"],
                goal: workoutDoc.data()["goal"],
                muscles: workoutDoc.data()["muscles"],
                Instructions: workoutDoc.data()["instructions"],
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

export async function getQueryWorkoutsList(field, operator, value) {
    const workoutslist = [];
    try {
        console.log("In query function")
        const ref = collection(db, "workouts");
        //search through all the doc
        const q = query(ref, where(field, operator, value));        
        const qsnap = await getDocs(q);
        qsnap.forEach((workout) => {
            workoutslist.push(workout.id);
        });
    } catch (error) {
        console.error(error.message);
    }
    return workoutslist;
}

export async function searchWorkouts(lowerbody, upperbody, cardio, core, glutes) {
    let lowerbodylist = [];
    let upperbodylist = [];
    //let fullbodylist = [];
    let cardiolist = [];
    let corelist = [];
    let gluteslist = [];

    if (lowerbody) {
        
        try {
            console.log("In search function")
            lowerbodylist = await getQueryWorkoutsList("goal", "==", "Lower Body");
        } catch(error) {
            console.log(error);
        }
    }
    if (upperbody) {
        try {
            upperbodylist = await getQueryWorkoutsList("goal", "==", "Upper Body");
        } catch(error) {
            console.log(error);
        }
    }
    
    if (cardio) {
        try {
            cardiolist = await getQueryWorkoutsList("goal", "==", "Cardio");
        } catch(error) {
            console.log(error);
        }
    }
    if (core) {
        try {
            corelist = await getQueryWorkoutsList("goal", "==", "Core");
        } catch(error) {
            console.log(error);
        }
    }
    if (glutes) {
        try {
            gluteslist = await getQueryWorkoutsList("goal", "==", "Glutes");
        } catch(error) {
            console.log(error);
        }
    }
    const allLists = [lowerbodylist, upperbodylist, cardiolist, corelist, gluteslist];
   
    //let filteredLists = allLists.filter(array => array.length > 0);
    //if (!filteredLists) {
    //    return [];
    //}

    // Flatten the array and create a new Set to get unique values
    const uniqueValues = [...new Set(allLists.flat())];

    //let commonRecipes = filteredLists[0];
    //filteredLists.slice(1).forEach(array => {
    //    commonRecipes = commonRecipes.filter(value => array.includes(value));
    //});
    //console.log("In filter")
    //console.log(commonRecipes);
    //console.log(filteredLists);
    //console.log("unique")
    //console.log(uniqueValues)
    return uniqueValues;
    //return filteredLists;

}
