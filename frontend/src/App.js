import {auth, googleProvider} from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

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
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [weight,setWeight] = useState("");
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
          } catch (err) {
            console.error(err);
          }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
          } catch (err) {
            console.error(err);
          }
    };

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
      
      <h2>Manual Signin:</h2>
      <button onClick={signIn}> Sign In</button>

      <h2>Google Signin:</h2>
      <button onClick={signInWithGoogle}> Sign In With Google</button>
      <button onClick={logout}> Logout </button>

      <h2>Your Information:</h2>
      <MyForm question = "Weight: " changeValue = {setWeight}/>
    </div>
    );
};