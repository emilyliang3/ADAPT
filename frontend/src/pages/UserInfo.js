import MyForm from '../question-textbox'
import { useState } from "react";
import { updateWeight } from '../userFunctions.js';

function UserInfo() {
    const [name, setName] = useState("")
    const [weight,setWeight] = useState("");
    const [birthMonth,setBirthMonth] = useState("");
    const [birthDay,setBirthDay] = useState("");
    const [birthYear,setBirthYear] = useState("");


    function changeValue(weight) {
        setWeight(weight);
        updateWeight(weight);
    }

    return (
        <>
            <h1>Hi {name}!</h1>
            <MyForm question = "Name: " changeValue = { changeValue }/>
            <h2>Your Information:</h2>
            <MyForm question = "Weight: " changeValue = { changeValue }/>
            <h4>Your weight is {weight}</h4>
            <MyForm question = "Birth Month (1-12): " changeValue = { changeValue }/>
            <MyForm question = "Birth Day (1-31): " changeValue = { changeValue }/>
            <MyForm question = "Birth Year (1900-2023): " changeValue = { changeValue }/>
            <h4>{birthMonth} / {birthDay} / {birthYear}</h4>
            
        </>
    );
}
export default UserInfo;
