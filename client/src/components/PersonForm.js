import React, { useState } from 'react'
import axios from 'axios';

const PersonForm = (props) => {
    //keep track of what is being typed via useState hook
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState("");
    const {socket} = props
    
    const {setPeople,people ,setUpdate,update} = props;
    const [ errors,setErrors] = useState([])
     

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/people', {
            firstName,    
            lastName     
        })
            .then(res=>{
                console.log(res.data)
                if (res.data.errors) {
                    setErrors(res.data.errors);
          
                }
                
                else{
                    setLastName("")
                    setFirstName("")
                    setErrors("");
                setUpdate(!update)
                console.log("sapo nisa nje request tek server")
                socket.emit("toServer", res.data);
            }

            })
            .catch(err=>{
                // setErrors(err.data.errors);
                console.log("erorrTEst:"+ JSON.stringify(err))
            }
                )
    }
    
    
    return (
        <form className='col-sm-3' onSubmit={onSubmitHandler}>
            <p>
            

                <label>First Name</label><br/>
                    {errors.firstName ?  <p>  {errors.firstName.message }</p>  : ""}
                 
                <input type="text" value={firstName} onChange = {(e)=>setFirstName(e.target.value)}/>
            </p>
            <p>
                <label>Last Name</label><br/>
                {errors.lastName ?  <p>  {errors.lastName.message }</p>  : ""}

                <input type="text" value={lastName} onChange = {(e)=>setLastName(e.target.value)}/>
            </p>
            <input  type="submit"/>
        </form>
    )
}
export default PersonForm;

