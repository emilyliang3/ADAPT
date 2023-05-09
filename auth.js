import {auth, googleProvider} from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export const Auth = () => {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");

    

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
        <input 
        placeholder="Email..."
        onChange = {(e) => setemail(e.target.value)}
        />
        <input 
        placeholder="Password..."
        type = "password"
        onChange = {(e) => setPassword(e.target.value)}
        />

        <button size="sm" onClick={signIn}> Sign In</button>

        <button size="lg" onClick={signInWithGoogle}> Sign In With Google</button>

        <button onClick={logout}> Logout </button>

    </div>

    );
};