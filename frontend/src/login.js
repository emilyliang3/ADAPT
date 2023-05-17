import { signUpWithEmail, signInWithGoogle, auth } from './firebaseFunctions';
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useUser } from './firebaseFunctions';
//import { BrowserRouter, Route, Link } from "react-router-dom";

export default function LoginButtons(){
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const user = useUser();

    const logout = async () => {
        try {
            await signOut(auth);
          } catch (err) {
            console.error(err);
          }
    };

    // TODO: re render page when sign in state changes
    function SignInDisplay(){
      if (user){
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