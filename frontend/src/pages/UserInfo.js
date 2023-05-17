import MyForm from '../question-textbox'
import { useState, useEffect } from "react";
import { updateUserField, getUserField } from '../userFunctions.js';
import { useUser } from '../firebaseFunctions';

function UserInfo() {
    const user = useUser();
    const [name, setName] = useState("")
    const [weight, setWeight] = useState("");
    const [birthMonth,setBirthMonth] = useState("");
    const [birthDay,setBirthDay] = useState("");
    const [birthYear,setBirthYear] = useState("");

    // hook that runs when user variable is updated
    useEffect(() => {
        if (user) {
            getUserField(user, "weight").then((weightValue) => {
                const userWeight = weightValue;
                if (userWeight) {
                    setWeight(userWeight);
                }
            })
        }
        else {
            setWeight("");
        }
    }, [user]);

    function changeValue(weight) {
        setWeight(weight);
        updateUserField(user, "weight", weight);
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
