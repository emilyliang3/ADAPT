import { useState } from "react";

export default function MyForm({question,changeValue}) {
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