import { doc, getDoc, getDocs, collection, where, query } from 'firebase/firestore';
import { db } from './firebaseFunctions.js';
import { calculateUserBMI } from './userFunctions.js';

// recipe constant values
let PROTEIN_MIN = 20;
let FAT_MAX = 5;
let CAL_MAX = 350;

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

export async function searchRecipes(protein, fat, cal, df, gf, veg) {
    let fatlist = [];
    let proteinlist = [];
    let callist = [];
    let dflist = [];
    let gflist = [];
    let veglist = [];

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


export async function customRecipesByBMI(user) {
    const bmi = await calculateUserBMI(user);

    if (bmi >= 25) {
        PROTEIN_MIN = 20;
        FAT_MAX = 11;
        CAL_MAX = 175;
    }
    else if (bmi <= 18.5) {
        PROTEIN_MIN = 20;
        FAT_MAX = 11;
        CAL_MAX = 450;
    }
  }

export async function resetCustomRecipesByBMI() {
    PROTEIN_MIN = 0;
    FAT_MAX = 1000;
    CAL_MAX = 1000;
}