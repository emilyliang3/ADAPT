import food1 from '../images/food1.jpg';
import food2 from '../images/food2.jpg';
import food3 from '../images/food3.jpg';
const Apple = ["Apple","fruit","95"]
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
    return (
        <>
            <h1>this is the food</h1>
            <Food arr = {Apple} />
            <img src = {food1} className = "picture"/>
            <img src = {food2} className = "picture"/>
            <img src = {food3} className = "picture"/>
        </>
    );
}

export default Food;
