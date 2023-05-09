import {auth, googleProvider} from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

import { useState } from 'react';
function handleClick(){

}

function MyForm({question,changeValue}) {
  const [name, setName] = useState("");

  function handleSubmit(event){
    event.preventDefault();
    changeValue(name);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>{question} 
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  );
}

export default function App(){
  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [weight,setWeight] = useState("");
  return (
  <>
    <h1> ADAPT (Aiding Dietician and Personal Trainer)</h1>
    <h2>Google Signin:</h2>
    <button onClick = {handleClick}>Sign in with Google</button>

    <h2>Manual Signin:</h2>
    <MyForm question = "Username: " changeValue = {setUserName}/>
    <MyForm question = "Password: " changeValue = {setPassword}/>
    <h3>Your username is {userName}</h3>
    <h3>Your password is {password}</h3>
    <h2>Your Information:</h2>
    <MyForm question = "Weight: " changeValue = {setWeight}/>

    <h3>Your weight is {weight}</h3>

  </>
  );

}