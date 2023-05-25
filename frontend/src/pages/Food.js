import food1 from '../images/food1.jpg';
import food2 from '../images/food2.jpg';
import food3 from '../images/food3.jpg';
import {useState} from 'react';
import { getRecipeData, searchRecipes } from '../recipeFunctions';
const Apple = ["Apple","fruit","95"];

function Food() {
  function Food({arr}) {
      return (
        <div>
          <h1>This is the food</h1>
          <ol>
            {arr.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
            
        </div>
      );
  }
  const [checkboxValues, setCheckboxValues] = useState({
    highProtein: false,
    lowFat: false,
    lowCalorie: false,
    dairyFree: false,
    glutenFree: false,
    vegetarian: false,
  });
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
      // Handle form submission or perform any desired actions with checkboxValues
      console.log(checkboxValues);
      setCheckboxValues({
        highProtein: false,
        lowFat: false,
        lowCalorie: false,
        dairyFree: false,
        glutenFree: false,
        vegetarian: false,
      });
    };

    return (
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    );
  }


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
          <Tag tagName = 'DF' tf = {DF} />
          <Tag tagName = 'GF' tf = {GF} />
          <Tag tagName = 'VEG' tf = {veg} />     
          <a href={instructions}>Click here for instructions and full recipe</a>                   
        </>
      );
    }

  function DisplayMultiple({test}){
    return (
      <ol>
          {test.map((item, index) => (
            <li key={index}>
              <DisplayOneRecipe recipleName = {item} />
            </li>
          ))}
      </ol>
    )
  }
  const test = ["food1","food2","food3"];
  return (
    <div className = "shift-right">
      <MyForm />
      <h1>this is the food</h1>
      <button type="Sort by calories">Sort by calories</button>
      <button type="Sort by protein">Sort by protein</button>
      <Food arr = {Apple} />
      <DisplayOneRecipe />
      <img src = {food1} className = "picture"/>
      <img src = {food2} className = "picture"/>
      <img src = {food3} className = "picture"/>
      <DisplayMultiple test = {test} />
    </div>

  );
}

export default Food;
