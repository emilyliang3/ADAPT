import { signUpWithEmail, signInWithGoogle, auth } from './firebaseFunctions';
import { signOut } from "firebase/auth";
import MyForm from './question-textbox'
import { useState } from "react";

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
      <button onClick={() => signInWithGoogle()}> Sign In With Google</button>
      <button onClick={logout}> Logout </button>
    </div>
    );
};