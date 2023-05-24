import workout1 from '../images/workout1.jpg';
import workout2 from '../images/workout2.jpg';
import workout3 from '../images/workout3.jpg';

import food1 from '../images/food1.jpg';


function Workout() {
    return (
        <div className = "shift-right">
            <h1>this is the workout</h1>
            <img src = {workout1} className = "picture"/>
            <img src = {workout2} className = "picture"/>
            <img src = {workout3} className = "picture"/>
        </div>
    );
}

export default Workout;
