import gym1 from '../images/gym1.jpg';
import gym2 from '../images/gym2.jpg';
import gym3 from '../images/gym3.jpg';

import { signUpWithEmail, signInWithGoogle,signInWithEmail, auth, useUser } from '../firebaseFunctions';
import { signOut } from "firebase/auth";
import { useState } from "react";
import React, { useEffect } from 'react';
import '../index.css';
import './login.css';

export default function LoginButtons(){
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const user = useUser();

    // changes welcome message when user variable is updated
    useEffect(() => {
      if (user) {
          setWelcomeMessage("You are signed in! You can now navigate to User Info, Food, or Workout.");
      }
      else {
          setWelcomeMessage("Warning: You are not signed in! Sign in to get access to personalized results and the User Info page.");
      }
    }, [user]);

    const logout = async () => {
        try {
            await signOut(auth);
          } catch (err) {
            console.error(err);
          }
    };

    return (
    <div>
      <h1> ADAPT (Aiding Dietician and Personal Trainer)</h1>
      <h3 className="message">Welcome to ADAPT!<br></br>Visit the Food page to find recipes tailored to specific nutritional goals and/or needs.<br></br>Vist the Workout page to search for workouts that align with your fitness goals. </h3>
      <h3 className="blue">{welcomeMessage}</h3>

      
      <div className = "color">

        <div className = "box2">
          <h2>Existing users:</h2> 
          <input className="field" placeholder="Email..."
          onChange = {(e) => setemail(e.target.value)}
          />
          <input className="field" placeholder="Password..."
          onChange = {(e) => setPassword(e.target.value)}
          />
          <button className="sign" onClick={() => signInWithEmail(email, password)}>Sign In</button>
          <h3 className="or">or</h3>
          <button className="google" onClick={() => signInWithGoogle()}> Sign In with Google</button>
            <div className="bigspace"></div>


          <h2>Create an account:</h2>
          <input className="field" 
          placeholder="Email..."
          onChange = {(e) => setemail(e.target.value)}
          />
          <input className="field" 
          placeholder="Password..."
          type = "password"
          onChange = {(e) => setPassword(e.target.value)}
          />
          <button className="sign" onClick={() => signUpWithEmail(email, password)}> Sign Up</button>
          <div className="bigspace"></div>

          <h2>Sign Out:</h2>
          <button className="logout" onClick={logout}> Logout </button>
          <div className="bigspace"></div>

        </div>

      </div>
      <br></br>
      <br></br>
      
      <img src = {gym1} className = "picture"/>
      <img src = {gym2} className = "picture"/>
      <img src = {gym3} className = "picture"/>
      
    </div>
    );
};