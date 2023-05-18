import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
const Update = (props) => {
    const { id } = useParams(); //this process is identical to the one we used with our Details.js component
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [lastNameVal, setLastNameVal] = useState("");
    const navigate = useNavigate();
    // retrieve the current values for this person so we can fill
    // in the form with what is in the db currently
    useEffect(() => {
        axios.get('http://localhost:8000/api/people/' + id)
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
            })
            .catch(err => console.log(err))
    }, [])
    const updatePerson = (e) => {
        e.preventDefault();
        axios.patch('http://localhost:8000/api/people/' + id, {
            firstName,    // this is shortcut syntax for firstName: firstName,
            lastName      // this is shortcut syntax for lastName: lastName
        })
            .then(res => {
                if ( res.data === "ekziston") {
                    setLastNameVal(res.data)
                } else{
                    navigate("/");
                // setPeople([...people, res.data]); 
            }
//                 console.log(res); // always console log to get used to tracking your data!
                console.log("response"+JSON.stringify(res.data) );


                 // this will take us back to the Main.js
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h1>Update a Person</h1>
            <form onSubmit={updatePerson}>
                <p>
                {lastNameVal ? <p>  {lastNameVal }</p>  : ""}
                    <label>First Name</label><br />
                    <input type="text" 
                    name="firstName" 
                    value={firstName} 
                    onChange={(e) => { setFirstName(e.target.value) }} />
                </p>
                <p>
                    <label>Last Name</label><br />
                    <input type="text" 
                    name="lastName"
                    value={lastName} 
                    onChange={(e) => { setLastName(e.target.value) }} />
                </p>
                <input type="submit" />
            </form>
        </div>
    )
}
export default Update;

