import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './auth';
import {db} from './firebase'
import { getDocs, collection } from 'firebase/firestore' 

function App() {
  const [movieList, setMovieList]  = useState([])
  const moviesCollectionRef = collection(db, "movies")

  useEffect(() => {
    const getMovieList = async () => {
      //Read the data
      //set the movie list
      try {
        const data = await getDocs(moviesCollectionRef);
      } catch (err) {
        console.error(err);
      }
  };
    getMovieList();
  }, [])

  
  return (
    <div className="App">
    <Auth /> 
    
    <button></button>
    </div>
  );
}

export default App;