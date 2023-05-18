import food1 from '../images/food1.jpg';
import food2 from '../images/food2.jpg';
import food3 from '../images/food3.jpg';
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

    function DisplayOneRecipe({recipeName}){
      const name = "taco";
      const nutritionalInfo = "none";
      const ingredients = ["salt","sugar"];
      const tags = ["high protein", "dairy free"];
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
        </>
      );
    }
    return (
        <>
            <h1>this is the food</h1>
            <Food arr = {Apple} />
            <DisplayOneRecipe />
            <img src = {food1} className = "picture"/>
            <img src = {food2} className = "picture"/>
            <img src = {food3} className = "picture"/>
        </>
    );
}

export default Food;
