import workout1 from '../images/workout1.jpg';
import workout2 from '../images/workout2.jpg';
import workout3 from '../images/workout3.jpg';
import { useState } from "react";
import { getWorkoutData, searchWorkouts } from '../workoutFunctions';

  function DisplayOneWrokout({WorkoutName}){
    const [name, setName] = useState("N/A"); 
    const [goal, setgoal] = useState([]);
    const [muscles, setmuscles] = useState([]);
    const [Instructions, setInstructions] = useState("N/A");
   
    //Need to modify after sample created
    getWorkoutData(WorkoutName).then((obj) => {
      if (obj.name) {
        setName(obj.name);
      }
      if (obj.goal) {
        setgoal(obj.goal);
      }
      if (obj.muscles) {
        setmuscles(obj.muscles);
      }
      if (obj.Instructions) {
        setInstructions(obj.Instructions);
      }
    });

    return (
      <div className = "box">
        <h3 className = "title">{name}</h3>
        <h3 className = "header">Muscles groups:</h3>
        <ul className = "table">
        {muscles.map((item, index) => (
          <li key={index} className = "tag2">{item}</li>
          
        ))}
        </ul>
        <br></br> 
        <a href={Instructions}>Click here for instructions and full workout</a>
      </div>
    );
  }


function DisplayWorkouts({workouts}) {
  let WrokoutHeader = "";
  const allWorkouts = workouts.map(name => (
    <DisplayOneWrokout key={name} WorkoutName={name} />
  ));
  if (workouts.length >= 1) {
    WrokoutHeader = "Here's the Workouts that I found!"
  }
  return (
    <div>
    <h2>{WrokoutHeader}</h2>
    {allWorkouts}
    </div>
  );
}

//check box value
function Workout() {
  const [checkboxValues, setCheckboxValues] = useState({
    LowerBody: false,
    UpperBody: false,

    Cardio: false,
    Core: false,
    Glutes: false,
  });
  const [workouts, setWorkouts] = useState([]);

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
      //const options = Object.values(checkboxValues);

      //testing
      setWorkouts([]);
      const options = Object.values(checkboxValues);
      searchWorkouts(...options).then((workouts) => {
        if (workouts) {
          setWorkouts(workouts);
          //console.log(workouts);
        }
      });
      setCheckboxValues({
        LowerBody: false,
        UpperBody: false,
       
        Cardio: false,
        Core: false,
        Glutes: false,
      });
    };

    return (
      <form onSubmit={handleSubmit} className = "box">
        <label>
          <input
            type="checkbox"
            name="LowerBody"
            checked={checkboxValues.LowerBody}
            onChange={handleCheckboxChange}
          />
          Lower Body
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="UpperBody"
            checked={checkboxValues.UpperBody}
            onChange={handleCheckboxChange}
          />
          Upper Body
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="Cardio"
            checked={checkboxValues.Cardio}
            onChange={handleCheckboxChange}
          />
          Cardio
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="Core"
            checked={checkboxValues.Core}
            onChange={handleCheckboxChange}
          />
          Core
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="Glutes"
            checked={checkboxValues.Glutes}
            onChange={handleCheckboxChange}
          />
          Glutes
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }

  return (
    <div>
      <h1>Hi! I'm APT, your Aiding Personal Trainer!</h1>
      <h2>Select any goals options below and I'll find the best workouts that match what you're looking for!</h2>
      <div className = "color">
        <MyForm/>
      </div>
        
      <DisplayWorkouts workouts = {workouts} />
      <br></br>
      <img src = {workout1} className = "picture"/>
      <img src = {workout2} className = "picture"/>
      <img src = {workout3} className = "picture"/>
      
    </div>

  );
}

export default Workout;



