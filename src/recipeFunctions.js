import { doc, getDoc, getDocs, collection, where, query } from 'firebase/firestore';
import { db } from './firebaseFunctions.js';

export async function getRecipeData(recipe_id) {
    try {
        const ref = doc(db, "recipes", recipe_id);
        const recipeDoc = await getDoc(ref);
        if (recipeDoc.exists()) {
            const recipeData = {
                name: recipeDoc.data()["name"],
                ingredients: recipeDoc.data()["ingredients"],
                calories: recipeDoc.data()["calories"],
                protein: recipeDoc.data()["protein"],
                fat: recipeDoc.data()["fat"],
                df: recipeDoc.data()["df"],
                gf: recipeDoc.data()["gf"],
                veg: recipeDoc.data()["ingredients"],
                instructions: recipeDoc.data()["instructions"],
            };
            return recipeData;
        }
        else {
            console.error("recipe doc doesn't exist")
        }
    } catch (error) {
        console.error(error.message);
    }
};

async function getQueryRecipesList(field, operator, value) {
    const recipeslist = [];
    try {
        const ref = collection(db, "recipes");
        const q = query(ref, where(field, operator, value));
        const qsnap = await getDocs(q);
        qsnap.forEach((recipe) => {
            recipeslist.push(recipe.id);
        });
    } catch (error) {
        console.error(error.message);
    }
    return recipeslist;
}

export async function searchRecipes(protein, fat, cal, df, gf, veg, bmi, height, weight) {
    let fatlist = [];
    let proteinlist = [];
    let callist = [];
    let dflist = [];
    let gflist = [];
    let veglist = [];
    let PROTEIN_MIN = 20;
    let FAT_MAX = 5;
    let CAL_MAX = 350;

    if (bmi) {
        const thresholds = getCustomThresholds(height, weight);
        PROTEIN_MIN = thresholds[0];
        FAT_MAX = thresholds[1];
        CAL_MAX = thresholds[2];
    }

    if (protein) {
        try {
            proteinlist = await getQueryRecipesList("protein", ">=", PROTEIN_MIN);
        } catch(error) {
            console.log(error);
        }
    }
    if (fat) {
        try {
            fatlist = await getQueryRecipesList("fat", "<=", FAT_MAX);
        } catch(error) {
            console.log(error);
        }
    }
    if (cal) {
        try {
            callist = await getQueryRecipesList("calories", "<=", CAL_MAX);
        } catch(error) {
            console.log(error);
        }
    }
    if (df) {
        try {
            dflist = await getQueryRecipesList("df", "==", true);
        } catch(error) {
            console.log(error);
        }
    }
    if (gf) {
        try {
            gflist = await getQueryRecipesList("gf", "==", true);
        } catch(error) {
            console.log(error);
        }
    }
    if (veg) {
        try {
            veglist = await getQueryRecipesList("veg", "==", true);
        } catch(error) {
            console.log(error);
        }
    }
    const allLists = [proteinlist, fatlist, callist, dflist, gflist, veglist];
    let filteredLists = allLists.filter(array => array.length > 0);
    if (!filteredLists) {
        return [];
    }
    let commonRecipes = filteredLists[0];
    filteredLists.slice(1).forEach(array => {
        commonRecipes = commonRecipes.filter(value => array.includes(value));
    });
    return commonRecipes;
}

function calculateBMI(heightInInches, weightInPounds) {
    // Convert height to meters
        const heightInMeters = heightInInches * 0.0254;
    
    // Convert weight to kilograms
        const weightInKilograms = weightInPounds * 0.45359237;
    
    // Calculate BMI
        const bmi = weightInKilograms / (heightInMeters * heightInMeters);
    
    // Return BMI rounded to two decimal places
        return bmi.toFixed(2); 
      }

function getCustomThresholds(height, weight) {
    let PROTEIN_MIN = 20;
    let FAT_MAX = 5;
    let CAL_MAX = 350;

    const bmi = calculateBMI(height, weight)

    if (bmi >= 25) {
        PROTEIN_MIN = 30;
        FAT_MAX = 6;
        CAL_MAX = 450;
    }
    else if (bmi <= 18.5) {
        PROTEIN_MIN = 10;
        FAT_MAX = 4;
        CAL_MAX = 175;
    }
    return [PROTEIN_MIN, FAT_MAX, CAL_MAX]
}