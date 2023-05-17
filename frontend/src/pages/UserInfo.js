import MyForm from '../question-textbox'
import { useState } from "react";
import { updateWeight } from '../userFunctions.js';

function UserInfo() {
    const [weight,setWeight] = useState("");

    function changeValue(weight) {
        setWeight(weight);
        updateWeight(weight);
    }

    return (
        <>
            <h2>Your Information:</h2>
            <MyForm question = "Weight: " changeValue = { changeValue }/>
            <h4>Your weight is {weight}</h4>
            <MyForm question = "Weight: " changeValue = { changeValue }/>
        </>
    );
}
export default UserInfo;
