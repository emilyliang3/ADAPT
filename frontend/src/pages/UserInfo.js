import MyForm from '../question-textbox'
import { useState } from "react";

function UserInfo() {
    const [weight,setWeight] = useState("");
    return (
        <>
            <h2>Your Information:</h2>
            <MyForm question = "Weight: " changeValue = {setWeight}/>
            <h4>Your weight is {weight}</h4>
        </>
    );
}
export default UserInfo;
