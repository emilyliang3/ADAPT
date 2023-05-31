import { useState } from "react";

export default function MyForm({question,changeValue, type}) {
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
            type={type} 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    );
  }