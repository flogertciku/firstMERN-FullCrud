import React, { useState } from 'react'
import axios from 'axios';
import PersonForm from '../components/PersonForm';
import PersonList from '../components/PersonList';
const Main = (props) => {
    
    const [people, setPeople] = useState([]);
    const [update, setUpdate] = useState(false);
    
    return (
        <div>
    	/* PersonForm and Person List can both utilize the getter and setter established in their parent component: */
           <PersonForm people={people} update={update}  setUpdate={ setUpdate} setPeople={setPeople} />
            <hr/>
         {/* <h2> Person List</h2> */}
           <PersonList people={people} update={update} setUpdate={ setUpdate} setPeople={setPeople} />
        </div>
    )
}
export default Main;
