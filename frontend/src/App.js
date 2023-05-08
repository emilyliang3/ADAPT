import { useState } from 'react';
const user = {
  firstName:"curtis",
  lastName:"chen",
  weight:"50",
  gender:"male"
};

function User({user}) {
  return (
    <>
      <h2>Name is {user.firstName}</h2>
      <h2>Weight is {user.weight}</h2>
      <h2>Gender is {user.gender}</h2>
    </>
  );
}
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
  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");
  return (
  <>
    <h1> ADAPT (Aiding Dietician and Personal Trainer)</h1>
    <MyForm question = "Username: " changeValue = {setUserName}/>
    <MyForm question = "Password: " changeValue = {setPassword}/>
    <h3>Your username is {userName}</h3>
    <h3>Your password is {password}</h3>
    <User user = {user}/>
  </>
  );
}

  