import { useState } from 'react';
export default function MyForm() {
  const [name, setName] = useState("");
  const [displayName,setDisplayName] = useState("");

  function handleSubmit(event){
    event.preventDefault();
    setDisplayName(name);
  }

  return (
    <>
      <h1>{displayName}</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter your name:
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    </>
  );
}