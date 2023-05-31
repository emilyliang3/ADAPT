import { useState, useEffect } from 'react';
import { updateUserField, getUserField } from '../userFunctions.js';
import { useUser } from '../firebaseFunctions';
import MyForm from '../question-textbox';
import './food.css';


// function FitnessForm() {
//   const [currentWeight, setCurrentWeight] = useState('');
//   const [goalWeight, setGoalWeight] = useState('');
//   const [goal, setGoal] = useState('');
//   const [currentAge, setAge] = useState('');
//   const [feet, setFeet] = useState('');
//   const [inches, setInches] = useState('');
//   const [workoutParts, setWorkoutParts] = useState([]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Perform actions with the user's inputs
//     console.log("Current Weight: " + currentWeight);
//     console.log("Goal Weight: " + goalWeight);
//     console.log("What is your age?" + currentAge);
//     console.log("Height: " + feet + " feet " + inches + " inches");
//     console.log("Goal: " + goal);
//     console.log("Workout Parts: " + workoutParts.join(", "));
//   };

//   const handleWorkoutPartChange = (part) => {
//     if (workoutParts.includes(part)) {
//       setWorkoutParts(workoutParts.filter((p) => p !== part));
//     } else {
//       setWorkoutParts([...workoutParts, part]);
//     }
//   };

//   const handleFeetChange = (value) => {
//     if (value <= 9) {
//       setFeet(value);
//     }
//   };

//   const handleInchesChange = (value) => {
//     if (value <= 11) {
//       setInches(value);
//     }
//   };

//   return (
//     <div>
//       <h1>Fitness Goals</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="currentWeight">Current Weight:</label>
//         <input
//           type="number"
//           id="currentWeight"
//           value={currentWeight}
//           onChange={(e) => setCurrentWeight(e.target.value)}
//           required
//         /><br /><br />

//         <label htmlFor="goalWeight">Goal Weight:</label>
//         <input
//           type="number"
//           id="goalWeight"
//           value={goalWeight}
//           onChange={(e) => setGoalWeight(e.target.value)}
//           required
//         /><br /><br />


//         <label htmlFor="currentAge">Current Age:</label>
//         <input
//           type="number"
//           id="currentAge"
//           value={currentAge}
//           onChange={(e) => setAge(e.target.value)}
//           required
//         /><br /><br />

//         <label htmlFor="feet"><p>Input Height Below: </p>Feet:</label>
//         <input
//           type="number"
//           id="feet"
//           value={feet}
//           onChange={(e) => handleFeetChange(e.target.value)}
//           required
//         />

//         <p>
//           <label htmlFor="inches">Inches:</label>
//           <input
//             type="number"
//             id="inches"
//             value={inches}
//             onChange={(e) => handleInchesChange(e.target.value)}
//             required
//           />
//         </p>


//         <p>Would you like to lose fat or gain muscle?</p>
//         <input
//           type="radio"
//           id="loseFat"
//           name="goal"
//           value="fat"
//           checked={goal === 'fat'}
//           onChange={() => setGoal('fat')}
//           required
//         />
//         <label htmlFor="loseFat">Lose Fat</label><br />
//         <input
//           type="radio"
//           id="gainMuscle"
//           name="goal"
//           value="muscle"
//           checked={goal === 'muscle'}
//           onChange={() => setGoal('muscle')}
//         />
//         <label htmlFor="gainMuscle">Gain Muscle</label><br /><br />

//         <label htmlFor="workoutPart">Which muscle groups would you like to workout?</label><br />
//         <input
//           type="checkbox"
//           id="chest"
//           value="chest"
//           checked={workoutParts.includes('chest')}
//           onChange={() => handleWorkoutPartChange('chest')}
//         />
//         <label htmlFor="chest">Chest</label><br />
//         <input
//           type="checkbox"
//           id="back"
//           value="back"
//           checked={workoutParts.includes('back')}
//           onChange={() => handleWorkoutPartChange('back')}
//         />
//         <label htmlFor="back">Back</label><br />
//         <input
//           type="checkbox"
//           id="arms"
//           value="arms"
//           checked={workoutParts.includes('arms')}
//           onChange={() => handleWorkoutPartChange('arms')}
//         />
//         <label htmlFor="arms">Arms</label><br />
//         <input
//           type="checkbox"
//           id="legs"
//           value="legs"
//           checked={workoutParts.includes('legs')}
//           onChange={() => handleWorkoutPartChange('legs')}
//         />
//         <label htmlFor="legs">Legs</label><br />
//         <input
//           type="checkbox"
//           id="abs"
//           value="abs"
//           checked={workoutParts.includes('abs')}
//           onChange={() => handleWorkoutPartChange('abs')}
//         />
//         <label htmlFor="abs">Abs</label><br />
//         <input
//           type="checkbox"
//           id="glutes"
//           value="glutes"
//           checked={workoutParts.includes('glutes')}
//           onChange={() => handleWorkoutPartChange('glutes')}
//         />
//         <label htmlFor="glutes">Glutes</label><br />
//         <input
//           type="checkbox"
//           id="fullBody"
//           value="fullBody"
//           checked={workoutParts.includes('fullBody')}
//           onChange={() => handleWorkoutPartChange('fullBody')}
//         />
//         <label htmlFor="fullBody">Full Body</label><br /><br />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

export default function UserInfo() {
  const user = useUser();
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    if (user) {
      getUserField(user, "name").then((name) => {
        if (name) {
          setName(name);
        }
      });
      getUserField(user, "weight").then((weight) => {
        if (weight) {
          setWeight(weight);
        } else {
          setWeight("not provided");
        }
      });
      getUserField(user, "height").then((height) => {
        if (height) {
          setHeight(height);
        } else {
          setHeight("not provided");
        }
      });
      getUserField(user, "birthday").then((birthday) => {
        if (birthday) {
          setBirthday(birthday);
        } else {
          setHeight("not provided");
        }
      });
    }
  }, [user]);

  function changeWeight(weight) {
    setWeight(weight);
    updateUserField(user, "weight", weight);
  }

  function changeHeight(height) {
    setHeight(height);
    updateUserField(user, "height", height);
  }

  function changeName(name) {
    setName(name);
    updateUserField(user, "name", name);
  }

  function changeBirthday(birthday) {
    setBirthday(birthday);
    updateUserField(user, "birthday", birthday);
  }

  return (
    <div>
      <h1 >Hi {name}!</h1>
      <h2>Your Information:</h2>
      <h3>Weight: {weight} lb</h3>
      <h3>Height: {height} in</h3>
      <h3>Birthday: {birthday}</h3>
      <br></br>
      <h2>Update Your Information:</h2>
      <div className="foodform">
      <MyForm question="Name: " changeValue={changeName} type="text" />
      <MyForm question="Weight (lb): " changeValue={changeWeight} type="number"/>
      <MyForm question="Height (inches): " changeValue={changeHeight} type="number"/>
      <MyForm question="Birthday (MM/DD/YYYY): " changeValue={changeBirthday} type="text"/>
      </div>
    </div>

  );
}

// export default function FitnessApp() {
//   return (
//     <div className = "shift-right">
//       <FitnessForm />
//       <UserInfo />
//     </div>

//   );
// }
