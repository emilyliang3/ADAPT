import MyForm from '../question-textbox'
import { useState, useEffect } from "react";
import { updateUserField, getUserField } from '../userFunctions.js';
import { useUser } from '../firebaseFunctions';

function UserInfo() {
    const user = useUser();
    const [weight, setWeight] = useState("");

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
            <h2>Your Information:</h2>
            <MyForm question = "Weight: " changeValue = { changeValue }/>
            <h4>Your weight is {weight}</h4>
        </>
    );
}
export default UserInfo;
