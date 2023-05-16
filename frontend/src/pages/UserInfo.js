import MyForm from '../question-textbox'
import { useState, useEffect } from "react";
import { updateWeight, getUserField } from '../userFunctions.js';
import { useUser } from '../firebaseFunctions';

function UserInfo() {
    const user = useUser();
    console.log(user);
    const [weight, setWeight] = useState("");

    // hook that runs when user variable is updated
    useEffect(() => {
        console.log("useeffect triiggereed");
        if (user) {
            console.log("user exists")
            getUserField(user, "weight").then((weightValue) => {
                const userWeight = weightValue;
                console.log("weight" + userWeight);
                if (userWeight) {
                    console.log("weight" + userWeight);
                    setWeight(userWeight);
                }
            })
        }
        else {
            setWeight("");
        }
    }, [user]);

    // function getInitialWeight() {
    //     if (user === null) {
    //         return "";
    //     }
    //     const userWeight = getUserWeight(user);
    //     if (userWeight) {
    //         return userWeight;
    //     }
    //     else {
    //         return "";
    //     }
    // }

    function changeValue(weight) {
        setWeight(weight);
        updateWeight(weight);
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
