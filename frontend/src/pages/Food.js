import food1 from '../images/food1.jpg';
import food2 from '../images/food2.jpg';
import food3 from '../images/food3.jpg';
import { useState } from "react";
import { getRecipeData } from '../recipeFunctions';

function Food() {
  function DisplayOneRecipe({recipeName}){
    const [name, setName] = useState("N/A");
    const [calories, setCalories] = useState("N/A");
    const [fat, setFat] = useState("N/A");
    const [protein, setProtein] = useState("N/A");
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState("N/A");
    const [DF, setDF] = useState(false);
    const [GF, setGF] = useState(false);
    const [veg, setVeg] = useState(false);

    function Tag({tagName,tf}){
      if (tf)
        return <h4>{tagName}</h4>;
      return;
    }

    getRecipeData(recipeName).then((obj) => {
      if (obj.name) {
        setName(obj.name);
      }
      if (obj.calories) {
        setCalories(obj.calories);
      }
      if (obj.fat) {
        setFat(obj.fat);
      }
      if (obj.protein) {
        setProtein(obj.protein);
      }
      if (obj.ingredients) {
        setIngredients(obj.ingredients);
      }
      if (obj.instructions) {
        setInstructions(obj.instructions);
      }
      if (obj.df) {
        setDF(obj.df);
      }
      if (obj.gf) {
        setGF(obj.gf);
      }
      if (obj.veg) {
        setVeg(obj.veg);
      }
    });

    return (
      <>
        <h3>Recipe: {name}</h3>
        <h3>Nutritional Info (per serving):</h3>
        <h4>Calories: {calories}</h4>
        <h4>Fat &#40;grams&#41;: {fat}</h4>
        <h4>Protein &#40;grams&#41;: {protein}</h4>
        <h3>Ingredients: </h3>
        <ol>
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol> 
        <h3>Tags</h3> 
        <Tag tagName = 'DF' tf = {df} />
        <Tag tagName = 'GF' tf = {gf} />
        <Tag tagName = 'VEG' tf = {veg} />     
        <a href={instructions}>Click here for instructions and full recipe</a>                   
      </>
    );
    }

    return (
        <>
            <h1>Recipe Search</h1>
            <button type="Sort by calories">Sort by calories</button>
            <button type="Sort by protein">Sort by protein</button>
            <h3>search gui will eventually be here...</h3>
            <h2>Here are some recipes that fit your criteria!</h2>
            <DisplayOneRecipe recipeName = "PeanutButterBananaPancakes" />
            <img src = {food1} className = "picture"/>
            <img src = {food2} className = "picture"/>
            <img src = {food3} className = "picture"/>
        </>
    );
}

export default Food;
