import { useState, useEffect } from 'react';
import { updateUserField, getUserField } from '../userFunctions.js';
import { useUser } from '../firebaseFunctions';
import MyForm from '../question-textbox';
import './userinfo.css';

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
    <>
      <h1>Hi {name}!</h1>
      <h2>Your Information:</h2>
      <div className="box">
      <h3 className="header">Weight (lb): <div className="black">{weight}</div></h3>
      <h3 className="header">Height (inches): <div className="black">{height}</div></h3>
      <h3 className="header">Birthday: <div className="black">{birthday}</div></h3>
      </div>
      <br></br>
      <h2>Update Your Information:</h2>
      <div className="box">
      <MyForm question="Name: " changeValue={changeName} type="text" />
      <MyForm question="Weight (lb): " changeValue={changeWeight} type="number"/>
      <MyForm question="Height (inches): " changeValue={changeHeight} type="number"/>
      <MyForm question="Birthday (MM/DD/YYYY): " changeValue={changeBirthday} type="text"/>
      </div>
    </>

  );
}