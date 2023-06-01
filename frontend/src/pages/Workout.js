import food1 from '../images/food1.jpg';
import food2 from '../images/food2.jpg';
import food3 from '../images/food3.jpg';
import { useState } from "react";
import { getWorkoutData, searchWorkouts } from '../workoutFunctions';


  function DisplayOneWrokout({WorkoutName}){
    const [name, setName] = useState("N/A"); 
    const [goal, setgoal] = useState([]);
    const [muscles, setmuscles] = useState([]);
    const [Instructions, setInstructions] = useState("N/A");
   

    //Need to modify after sample created
    getWorkoutData(WorkoutName).then((obj) => {
      console.log("ID")
      //console.log(name)

      if (obj.name) {
        setName(obj.name);
        console.log("setName")
        console.log(name)
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
      <>
        <h3>Workout testing: {name}</h3>
        <h3>Muscles groups:</h3>
        <ol>
        {muscles.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        </ol> 
        <a href={Instructions}>Click here for instructions and full workout</a>
      </>
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
    FullBody: false,
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
        FullBody: false,
        Cardio: false,
        Core: false,
        Glutes: false,
      });
    };

    return (
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            name="LowerBody"
            checked={checkboxValues.LowerBody}
            onChange={handleCheckboxChange}
          />
          LowerBody
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="UpperBody"
            checked={checkboxValues.UpperBody}
            onChange={handleCheckboxChange}
          />
          UpperBody
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="FullBody"
            checked={checkboxValues.FullBody}
            onChange={handleCheckboxChange}
          />
          FullBody
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
      <h1>Hi! I'm AD, your personal Aiding Dietician!</h1>
      <h2>Select any goals options below and I'll find the best workout that match what you're looking for!</h2>
      <MyForm />
      <DisplayWorkouts workouts = {workouts} />
      <br></br>
      
    </div>

  );
}



