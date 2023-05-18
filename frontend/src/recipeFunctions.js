import { doc, getDoc } from 'firebase/firestore';
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