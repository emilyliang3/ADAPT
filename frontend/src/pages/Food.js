import food1 from '../images/food1.jpg';
import food2 from '../images/food2.jpg';
import food3 from '../images/food3.jpg';
import {useState} from 'react';
const Apple = ["Apple","fruit","95"];
function MyForm() {
  const [checkboxValues, setCheckboxValues] = useState({
    highProtein: false,
    lowFat: false,
    lowCalorie: false,
    dairyFree: false,
    glutenFree: false,
    vegetarian: false,
  });

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

    function DisplayOneRecipe({recipeName}){
      const name = "taco";
      const nutritionalInfo = "none";
      const ingredients = ["salt","sugar"];
      const df = true;
      const gf = true;
      const veg = true;
      function Tag({tagName,tf}){
        if (tf)
          return <h4>{tagName}</h4>;
        return;
      }
      return (
        <>
          <h3>Our recipe makes a {name}</h3>
          <h3>Nutritional Info: {nutritionalInfo}</h3>
          <h3>Ingredients</h3>
          <ol>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
          <h3>Tags</h3> 
          <Tag tagName = 'DF' tf = {df} />
          <Tag tagName = 'GF' tf = {gf} />
          <Tag tagName = 'VEG' tf = {veg} />                  
        </>
      );
    }
    return (
      <>
        <MyForm />
        <h1>this is the food</h1>
        <button type="Sort by calories">Sort by calories</button>
        <button type="Sort by protein">Sort by protein</button>
        <Food arr = {Apple} />
        <DisplayOneRecipe />
        <img src = {food1} className = "picture"/>
        <img src = {food2} className = "picture"/>
        <img src = {food3} className = "picture"/>
      </>
    );
}

export default Food;
