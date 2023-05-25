import food1 from '../images/food1.jpg';
import food2 from '../images/food2.jpg';
import food3 from '../images/food3.jpg';
import { useState, useEffect } from "react";
import { getWorkoutData } from '../workoutFunctions';

import { firebaseConfig } from '../config.js'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function Workout() {
  function DisplayOneWrokout({WorkoutName}){
    const [name, setName] = useState("N/A"); 
    const [LowerBody, setLowerBody] = useState("N/A");
    const [UpperBody, setUpperBody] = useState("N/A");
    const [Compond, setCompond] = useState("N/A");
    const [Glutes, setGlutes] = useState("N/A");
    const [Instructions, setInstructions] = useState([]);
    const [Core, setCore] = useState("N/A");
    const [Cardio, setCardio] = useState("N/A");

    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [goal, setGoal] = useState('');
    const [currentAge, setAge] = useState('');
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const [workoutParts, setWorkoutParts] = useState([]);
    

    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    firebase.initializeApp(firebaseConfig);
    

  useEffect(() => {
    // Retrieve all data from Firebase
    const fetchData = async () => {
      const collectionRef = firebase.firestore().collection('workouts');
      const snapshot = await collectionRef.get();
      if (!snapshot.empty) {
        const fetchedData = snapshot.docs.map((doc) => doc.data());
        setData(fetchedData);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const filteredData = data.filter((item) => selectedItems.includes(item.name));
    

  

  const handleWorkoutPartChange = (part) => {
    if (workoutParts.includes(part)) {
      setWorkoutParts(workoutParts.filter((workoutPart) => workoutPart !== part));
    } else {
      setWorkoutParts([...workoutParts, part]);
    }
  };

    //const filterWorkout = data.filter((item) => workoutParts.includes(item.muscles));

    const filterWorkout = data.filter((item) => {
      // Check if any element in workoutParts appears in item.muscles
      return workoutParts.find((part) => item.muscles.includes(part));
    });

   

    //Need to modify after sample created
    getWorkoutData(WorkoutName).then((obj) => {
      if (obj.name) {
        setName(obj.name);
      }
      if (obj.LowerBody) {
        setLowerBody(obj.LowerBody);
      }
      if (obj.UpperBody) {
        setUpperBody(obj.UpperBody);
      }
      if (obj.Compond) {
        setCompond(obj.Compond);
      }
      if (obj.Instructions) {
        setInstructions(obj.Instructions);
      }
      if (obj.Glutes) {
        setGlutes(obj.Glutes);
      }
      if (obj.Core) {
        setCore(obj.Core);
      }
      if (obj.Cardio) {
        setCardio(obj.Cardio);
      }
    });

    return (
      <>
        <h3>Workout: {name}</h3>
        <h3>Nutritional Info (per serving):</h3>
        <h4>Compond: {Compond}</h4>
        <h4>Fat &#40;grams&#41;: {LowerBody}</h4>
        <h4>Protein &#40;grams&#41;: {LowerBody}</h4>
        <h3>Ingredients: </h3>
        <ol>
          
        </ol> 
        <a href={Instructions}>Click here for instructions and full recipe</a>

        <p>Would you like to lose fat or gain muscle?</p>
        <input
          type="radio"
          id="loseFat"
          name="goal"
          value="fat"
          checked={goal === 'fat'}
          onChange={() => setGoal('fat')}
          required
        />
        <label htmlFor="loseFat">Lose Fat</label><br />

        <input
          type="radio"
          id="gainMuscle"
          name="goal"
          value="muscle"
          checked={goal === 'muscle'}
          onChange={() => setGoal('muscle')}
        />
        <label htmlFor="gainMuscle">Gain Muscle</label><br /><br />

        <label htmlFor="workoutPart">Which muscle groups would you like to workout?</label><br />
        <input
          type="checkbox"
          id="chest"
          value="chest"
          checked={workoutParts.includes('chest')}
          onChange={() => handleWorkoutPartChange('chest')}
        />
        <label htmlFor="chest">Chest</label><br />
        <input
          type="checkbox"
          id="back"
          value="back"
          checked={workoutParts.includes('back')}
          onChange={() => handleWorkoutPartChange('back')}
        />
        <label htmlFor="back">Back</label><br />
        <input
          type="checkbox"
          id="arms"
          value="arms"
          checked={workoutParts.includes('arms')}
          onChange={() => handleWorkoutPartChange('arms')}
        />
        <label htmlFor="arms">Arms</label><br />
        <input
          type="checkbox"
          id="legs"
          value="legs"
          checked={workoutParts.includes('legs')}
          onChange={() => handleWorkoutPartChange('legs')}
        />
        <label htmlFor="legs">Legs</label><br />
        <input
          type="checkbox"
          id="abs"
          value="abs"
          checked={workoutParts.includes('abs')}
          onChange={() => handleWorkoutPartChange('abs')}
        />
        <label htmlFor="abs">Abs</label><br />
        <input
          type="checkbox"
          id="glutes"
          value="glutes"
          checked={workoutParts.includes('glutes')}
          onChange={() => handleWorkoutPartChange('glutes')}
        />
        <label htmlFor="glutes">Glutes</label><br />
        <input
          type="checkbox"
          id="fullBody"
          value="fullBody"
          checked={workoutParts.includes('fullBody')}
          onChange={() => handleWorkoutPartChange('fullBody')}
        />
        <label htmlFor="fullBody">Full Body</label><br /><br />



        <h1>Displaying Firebase Data</h1>
        <h2>Select Categories:</h2>

        {data.map((item) => (
        <div key={item.name}>
          <input
            type="checkbox"
            checked={selectedItems.includes(item.name)}
            onChange={() => handleCheckboxChange(item.name)}
          />
          <label>{item.name}</label>
        </div>
      ))}
      <h2>Selected Data1:</h2>
      {filteredData.map((item) => (
        <div key={item.name}>
          
          <p>{item.name}</p>
        </div>
      ))}

      <h2>Selected Data:</h2>
      {filterWorkout.map((item) => (
        <div key={item.name}>
          
          <p>{item.name}</p>
        </div>
      ))}
        
      

      </>
    );
    }

    return (
        <>
            <h1>Workout Search</h1>
            <h3>search gui will eventually be here...</h3>
            <h2>Here are some workout that fit your criteria!</h2>
            <DisplayOneWrokout WorkoutName = "Barbell Row" />
            
        </>
    );
}

export default Workout;




