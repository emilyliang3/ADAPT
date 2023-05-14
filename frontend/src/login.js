import { signUpWithEmail, signInWithGoogle, auth } from './firebaseFunctions';
import { signOut } from "firebase/auth";
import { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function signedIn(){
  //for backend ppl to modify (return true if signed in, false if not)
  return true;
}

export default function LoginButtons(){
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");

    const logout = async () => {
        try {
            await signOut(auth);
          } catch (err) {
            console.error(err);
          }
    };

    function SignInDisplay(){
      if (signedIn()){
        return <h3>You are signed in! Please navigate to home, workout, or food.</h3>;
      }
      return <h3>You are not signed in! Please sign in before navigating to other pages.</h3>;
    }
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
      
      <SignInDisplay />
    </div>
    );
};