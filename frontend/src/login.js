import { signUpWithEmail, signInWithGoogle, auth } from './firebaseFunctions';
import { signOut } from "firebase/auth";
import { useState } from "react";
import React, { useEffect } from 'react';
import { useUser } from './firebaseFunctions';
//import { BrowserRouter, Route, Link } from "react-router-dom";

export default function LoginButtons(){
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const user = useUser();

    // changes welcome message when user variable is updated
    useEffect(() => {
      if (user) {
          setWelcomeMessage("You are signed in! Please navigate to home, workout, or food.");
      }
      else {
          setWelcomeMessage("You are not signed in! Please sign in before navigating to other pages.");
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
      <input 
      placeholder="Email..."
      onChange = {(e) => setemail(e.target.value)}
      />
      
      <input 
      placeholder="Password..."
      type = "password"
      onChange = {(e) => setPassword(e.target.value)}
      />
      
      <h2>Manual Signup:</h2>
      <button onClick={() => signUpWithEmail(email, password)}> Sign Up</button>

      <h2>Google Signin:</h2>
      <button onClick={() => signInWithGoogle()}> Sign In with Google</button>
      <button onClick={logout}> Logout </button>
      
      <h3>{welcomeMessage}</h3>
    </div>
    );
};