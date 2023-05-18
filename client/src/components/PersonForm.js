import React, { useState } from 'react'
import axios from 'axios';
const PersonForm = (props) => {
    //keep track of what is being typed via useState hook
    const [firstName, setFirstName] = useState(""); 
    const [firstNameVal, setfirstNameVal] = useState("");
    const [lastName, setLastName] = useState("");
    const [lastNameVal, setLastNameVal] = useState("");
    const [ errors,setErrors] = useState([])
    
    const [val, setVal] = useState([]);
    const {setPeople,people ,setUpdate,update} = props;
  

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/people', {
            firstName,    
            lastName     
        })
            .then(res=>{
                if ( res.data === "ekziston") {
                    setfirstNameVal(res.data)
                } else if (res.data.errors) {
                    setErrors(res.data.errors);
                    console.log(res.data.errors)
                    if (res.data.errors.firstName) {
                        setfirstNameVal(res.data.errors.firstName.message)
                    } if (res.data.errors.lastName) {
                        setLastNameVal(res.data.errors.lastName.message)
                    }

                    const errorArr = []; 
                    
                }
                
                else{
                    setLastName("")
                    setFirstName("")
                    setErrors("");
                setUpdate(!update)
                setLastNameVal("")
                setfirstNameVal("")
            }

            })
            .catch(err=>{
               
                console.log("erorr:"+err)
            }
                )
    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            <p>
            

                <label>First Name</label><br/>
                    {errors.firstName ?  <p>  {errors.firstName.message }</p>  : ""}
                    {firstNameVal ? <p>  {firstNameVal }</p>  : ""}
                <input type="text" value={firstName} onChange = {(e)=>setFirstName(e.target.value)}/>
            </p>
            <p>
                <label>Last Name</label><br/>
                {errors.lastName ?  <p>  {errors.lastName.message }</p>  : ""}
                {lastNameVal ? <p>{lastNameVal}</p>  : ""}
                <input type="text" value={lastName} onChange = {(e)=>setLastName(e.target.value)}/>
            </p>
            <input type="submit"/>
        </form>
    )
}
export default PersonForm;

