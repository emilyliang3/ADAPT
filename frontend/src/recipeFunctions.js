import { doc, getDoc, getDocs, collection, where, query } from 'firebase/firestore';
import { db } from './firebaseFunctions.js';

// recipe constant values
const PROTEIN_MIN = 7;
const FAT_MAX = 5;
const CAL_MAX = 600;

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
        qsnap.foreach((recipe) => {
            recipeslist.push(recipe.id);
        });
    } catch (error) {
        console.error(error.message);
    }
    return recipeslist;
}

export function searchRecipes(protein, fat, cal, df, gf, veg) {
    const proteinlist = [];
    const fatlist = [];
    const callist = [];
    const dflist = [];
    const gflist = [];
    const veglist = [];

    if (protein) {
        proteinlist = getQueryRecipesList("proteein", ">=", PROTEIN_MIN);
    }
    if (fat) {
        fatlist = getQueryRecipesList("fat", "<=", FAT_MAX);
    }
    if (cal) {
        callist = getQueryRecipesList("calories", "<=", CAL_MAX);
    }
    if (df) {
        dflist = getQueryRecipesList("df", "==", true);
    }
    if (gf) {
        gflist = getQueryRecipesList("gf", "==", true);
    }
    if (veg) {
        veglist = getQueryRecipesList("veg", "==", true);
    }

    const allLists = [proteinlist, fatlist, callist, dflist, gflist, veglist];
    let commonRecipes = allLists.find(array => array.length > 0);
    if (commonRecipes) {
        allLists.slice(1).foreach(array => {
            commonRecipes = commonRecipes.filter(value => array.includes(value));
        });
    }
    else {
        return [];
    }
    
    return commonRecipes;
}

