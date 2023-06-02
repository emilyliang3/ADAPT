import food1 from '../images/food1.jpg';
import food2 from '../images/food2.jpg';
import food3 from '../images/food3.jpg';
import {useState} from 'react';
import { getRecipeData, searchRecipes, customRecipesByBMI } from '../recipeFunctions';
import '../index.css';
import './food.css';
import { useUser } from '../firebaseFunctions';



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
      return <div className="tag">{tagName}</div>;
    return;
  }

  getRecipeData(recipeName).then((obj) => {
    if (obj.name) {
      setName(obj.name);
    }
    if (obj.calories) {
      setCalories(obj.calories);
    }
    if (obj.fat || obj.fat == 0) {
      setFat(obj.fat);
    }
    if (obj.protein || obj.protein == 0) {
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
    <div className="recipe">
      <h3 className="title">Recipe: {name}</h3>
      <h3 className="header">Nutritional Info (per serving):</h3>
      <p className="text">Calories: <b>{calories}</b><br></br>Fat &#40;grams&#41;: <b>{fat}</b>g<br></br>Protein &#40;grams&#41;: <b>{protein}</b>g</p>
      <h3 className="header">Ingredients: </h3>
      <ol className="text">
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol> 
      <h3 className="header">Tags</h3> 
      <Tag tagName = 'DF' tf = {DF} />
      <Tag tagName = 'GF' tf = {GF} />
      <Tag tagName = 'VEG' tf = {veg} />    
      <br></br> <br></br>
      <a href={instructions}>Click here for instructions and full recipe</a>            
    </div>
  );
}

function DisplayRecipes({recipes}) {
  let recipeDisplayHeader = "";
  const allRecipes = recipes.map(name => (
    <>
    <DisplayOneRecipe key={name} recipeName={name} />
    <div className="space"></div>
    </>
  ));
  if (recipes.length >= 1) {
    recipeDisplayHeader = "Here's the recipes that I found!"
  }
  return (
    <div>
    <h2 className="blue">{recipeDisplayHeader}</h2>
    {allRecipes}
    </div>
  );
}

function Food() {
  const [checkboxValues, setCheckboxValues] = useState({
    highProtein: false,
    lowFat: false,
    lowCalorie: false,
    dairyFree: false,
    glutenFree: false,
    vegetarian: false,
    custom: false,
  });
  const [recipes, setRecipes] = useState([]);
  const user = useUser();

  function MyForm() {
    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      setCheckboxValues((prevState) => ({
        ...prevState,
        [name]: checked
      }));
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if(user){
        customRecipesByBMI(user);
      }
      setRecipes([]);
      // Handle form submission or perform any desired actions with checkboxValues
      const options = Object.values(checkboxValues);
      searchRecipes(...options).then((recipes) => {
        if (recipes) {
          setRecipes(recipes);
        }
      });
      setCheckboxValues({
        highProtein: false,
        lowFat: false,
        lowCalorie: false,
        dairyFree: false,
        glutenFree: false,
        vegetarian: false,
        custom: false,
      });
    };

    return (
        <form onSubmit={handleSubmit} className="box">
          <label>
            <input
              type="checkbox"
              name="highProtein"
              checked={checkboxValues.highProtein}
              onChange={handleCheckboxChange}
            />
            High Protein
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="lowFat"
              checked={checkboxValues.lowFat}
              onChange={handleCheckboxChange}
            />
            Low Fat
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="lowCalorie"
              checked={checkboxValues.lowCalorie}
              onChange={handleCheckboxChange}
            />
            Low Calorie
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="dairyFree"
              checked={checkboxValues.dairyFree}
              onChange={handleCheckboxChange}
            />
            Dairy Free
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="glutenFree"
              checked={checkboxValues.glutenFree}
              onChange={handleCheckboxChange}
            />
            Gluten Free
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="vegetarian"
              checked={checkboxValues.vegetarian}
              onChange={handleCheckboxChange}
            />
            Vegetarian
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="custom"
              checked={checkboxValues.custom}
              onChange={handleCheckboxChange}
            />
            Customize by my BMI
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
    );
  }

  return (
    <>
      <h1>Hi! I'm AD, your personal Aiding Dietician!</h1>
      <h2>Select any nutritional content options below and I'll find the best recipes that match what you're looking for!</h2>
      <div className = "color">
        <MyForm/>
        
      </div>
      <DisplayRecipes recipes = {recipes} />
      <br></br>
      <img src = {food1} className = "picture"/>
      <img src = {food2} className = "picture"/>
      <img src = {food3} className = "picture"/>
    </>

  );
}

export default Food;
