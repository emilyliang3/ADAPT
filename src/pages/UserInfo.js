import { useState, useEffect } from 'react';
import { updateUserField, getUserField } from '../userFunctions.js';
import { useUser } from '../firebaseFunctions';
import MyForm from '../question-textbox';

export default function UserInfo() {
  const user = useUser();
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthdayError, setBirthdayError] = useState("");

  useEffect(() => {
    if (user) {
      getUserField(user, "name").then((name) => {
        if (name) {
          setName(name);
        }
      });
      getUserField(user, "weight").then((weight) => {
        if (weight && weight > 0) {
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
          setBirthday("not provided");
        }
      });
    }
  }, [user]);

  function changeWeight(weight) {
    if (weight > 0) {
      setWeight(weight);
      updateUserField(user, "weight", weight);
    } else {
      console.log("Weight must be a positive value.");
    }
  }

  function changeHeight(height) {
    if (height > 0 && height <= 100) {
      setHeight(height);
      updateUserField(user, "height", height);
    } else {
      console.log("Height must be greater than 0.");
    }
  }

  function changeName(name) {
    setName(name);
    updateUserField(user, "name", name);
  }

  function changeBirthday(birthday) {
    const regex = /^\d+$/;

    if (!regex.test(birthday)) {
      setBirthdayError("Invalid birthday format. Please enter numbers only.");
      return;
    }

    const [month, day, year] = birthday.split("/");

    if (
      isNaN(parseInt(month)) ||
      isNaN(parseInt(day)) ||
      isNaN(parseInt(year))
    ) {
      setBirthdayError("Invalid birthday format. Please enter numbers only.");
      return;
    }

    if (
      parseInt(month) < 1 ||
      parseInt(month) > 12 ||
      parseInt(day) < 1 ||
      parseInt(day) > 31 ||
      parseInt(year) < 1900 ||
      parseInt(year) > new Date().getFullYear()
    ) {
      setBirthdayError("Invalid birthday format. Please enter a valid date.");
      return;
    }

    setBirthday(birthday);
    setBirthdayError("");
    // Your existing code for updating birthday goes here
  }

  return (
    <div className = "color1">
      
      <h1 className = "font-heading" >Hi {name}!</h1>
      <h2>Your Information:</h2>
      <div className = "color">
        <div className="box">
          <h3 className="header">Weight (lb): <div className="black">{weight}</div></h3>
          <h3 className="header">Height (inches): <div className="black">{height}</div></h3>
          <h3 className="header">Birthday: <div className="black">{birthday}</div></h3>
        </div>
      </div>

      <br></br>
      <h2>Update Your Information:</h2>

      <div className="box">
        <MyForm question="Name: " changeValue={changeName} type="text" />
        <MyForm question="Weight (lb): " changeValue={changeWeight} type="number"/>
        <MyForm question="Height (inches): " changeValue={changeHeight} type="number"/>
         <MyForm question="Birthday (MM/DD/YYYY): " changeValue={changeBirthday} type="text" errorMessage={birthdayError} />
      </div>
      <br></br>
      <div className = "space"></div>    
        <img src = "/workout4.jpg" className = "picture" alt = "People working out"/>
        <img src = "/workout5.jpg" className = "picture" alt = "People working out"/>
        <img src = "/workout6.jpg" className = "picture" alt = "People working out"/>
        <img src = "/workout7.jpg" className = "picture" alt = "People working out"/>

    
    </div>

  );
} 
