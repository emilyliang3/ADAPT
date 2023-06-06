import { signUpWithEmail, signInWithGoogle, signInWithEmail, auth, useUser } from '../firebaseFunctions';
import { signOut } from "firebase/auth";
import { useState } from "react";
import React, { useEffect } from 'react';

export default function LoginButtons() {
  const [existingEmail, setExistingEmail] = useState("");
  const [existingPassword, setExistingPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const user = useUser();

  // changes welcome message when user variable is updated
  useEffect(() => {
    if (user) {
      setWelcomeMessage("You are signed in! You can now navigate to User Info, Food, or Workout.");
    } else {
      setWelcomeMessage("Warning: You are not signed in! Sign in to get access to the other pages.");
    }
  }, [user]);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignIn = () => {
    signInWithEmail(existingEmail, existingPassword);
    setExistingEmail("");
    setExistingPassword("");
  };

  const handleSignUp = () => {
    signUpWithEmail(newEmail, newPassword);
    setNewEmail("");
    setNewPassword("");
  };

  return (
    <div>
      <h1>ADAPT (Aiding Dietician and Personal Trainer)</h1>
      <h3 className="message">Welcome to ADAPT!<br />Visit the Food page to find recipes tailored to specific nutritional goals and/or needs.<br />Vist the Workout page to search for workouts that align with your fitness goals.</h3>
      <h3 className="blue">{welcomeMessage}</h3>

      <div className="color">
        <div className="box2">
          <h2>Existing users:</h2>
          <input className="field" placeholder="Email..." onChange={(e) => setExistingEmail(e.target.value)} value={existingEmail} />
          <input className="field" placeholder="Password..." onChange={(e) => setExistingPassword(e.target.value)} value={existingPassword} />
          <button className="sign" onClick={handleSignIn}>Sign In</button>
          <h3 className="or">or</h3>
          <button className="google" onClick={signInWithGoogle}>Sign In with Google</button>
          <div className="bigspace"></div>

          <h2>Create an account:</h2>
          <input className="field" placeholder="Email..." onChange={(e) => setNewEmail(e.target.value)} value={newEmail} />
          <input className="field" placeholder="Password..." type="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
          <button className="sign" onClick={handleSignUp}>Sign Up</button>
          <div className="bigspace"></div>

          <h2>Sign Out:</h2>
          <button className="logout" onClick={logout}>Logout</button>
          <div className="bigspace"></div>
        </div>
      </div>
      <br />
      <br />

      <img src="/gym1.jpg" className="picture" alt="People working out" />
      <img src="/gym2.jpg" className="picture" alt="People working out" />
      <img src="/gym3.jpg" className="picture" alt="People workout out" />
    </div>
  );
};
