import React, { useState } from 'react'
import axios from 'axios';
import io from 'socket.io-client';  
import PersonForm from '../components/PersonForm';
import PersonList from '../components/PersonList';
const Main = (props) => {
  const {socket} = props
    
    const [people, setPeople] = useState([]);
    const [update, setUpdate] = useState(false);
    return (
        <div className='row d-flex align-items-start'>
           <PersonForm socket={socket}  people={people} update={update}  setUpdate={ setUpdate} setPeople={setPeople} />
         {/* <h2> Person List</h2> */}
        <PersonList  socket={socket} people={people} update={update} setUpdate={ setUpdate} setPeople={setPeople} />
        </div>
    )
}
export default Main;
