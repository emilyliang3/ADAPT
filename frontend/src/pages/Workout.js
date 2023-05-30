import workout1 from '../images/workout1.jpg';
import workout2 from '../images/workout2.jpg';
import workout3 from '../images/workout3.jpg';

import food1 from '../images/food1.jpg';

function Workout() {
    return (
        <div className = "shift-right">
            <h1>this is the workout</h1>
            <img src = {workout1} className = "picture"/>
            <img src = {workout2} className = "picture"/>
            <img src = {workout3} className = "picture"/>
        </div>
    );
}

function DisplayWorkouts({WorkoutsName}){
  const [Type, setType] = useState("N/A");
  const [exercise, setExercise] = useState([]);
  const [LowerBody, setLowerBody] = useState("N/A");
  const [UpperBody, setUpperBody] = useState("N/A");
  const [FullBody, setFullBody] = useState("N/A");
  const [cardio, setCardio] = useState("N/A");
  const [core, setCore] = useState("N/A");
  const [glutes, setGlutes] = useState("N/A");

  function Tag({tagName,tf}){
    if (tf)
      return <h4>{tagName}</h4>;
    return;
  }

  getWorkoutData(WorkoutsName).then((obj) => {
    if (obj.Type) {
      setType(obj.Type);
    }
    if (obj.LowerBody) {
      setLowerBody(obj.LowerBody);
    }
    if (obj.UpperBody || obj.UpperBody == 0) {
      setUpperBody(obj.UpperBody);
    }
    if (obj.FullBody || obj.FullBody == 0) {
      setFullBody(obj.FullBody);
    }
    if (obj.cardio) {
      setCardio(obj.cardio);
    }
    if (obj.core) {
      setCore(obj.core);
    }
    if (obj.glutes) {
      setGlutes(obj.glutes);
    }
    if (obj.exercise) {
      setExercise(obj.exercise);
    }
  });

  return (
    <>
      <h3>Types of Workouts:</h3>
      <h3>Workouts: {Type}</h3>
      <ol>
        {exercise.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol> 
      <h3>Tags</h3>     
      <a href={Type}>Click here for Workouts</a>                   
    </>
  );
}

function DisplayallWorkouts({workouts}) {
  let workoutDisplayHeader = "";
  const allworkouts = workouts.map(Type => (
    <DisplayWorkouts key={Type} workoutName={Type} />
  ));
  if (workouts.length >= 1) {
    workoutDisplayHeader = "Here's the workouts that I found!"
  }
  return (
    <div>
    <h2>{workoutDisplayHeader}</h2>
    {allworkouts}
    </div>
  );
}
export default DisplayWorkouts; 