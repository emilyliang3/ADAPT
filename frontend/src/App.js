import { useState } from 'react';

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
  </>
  );


}