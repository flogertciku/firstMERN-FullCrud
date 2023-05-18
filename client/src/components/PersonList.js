import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const PersonList = (props) => {
    /* We deconstruct getter and setter which were passed down 
    via props by the parent component (app.js) to our child 
    component (PersonList.js). Now we can easily use the getter 
    and setter without having to write props.getter or props.setter every time: */
    const { people, setPeople, update,setUpdate } = props;

    useEffect(() => {
        axios.get("http://localhost:8000/api/people")
            .then((res) => {
                // console.log(res.data);
                setPeople(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [update])

    const deletePerson = (personId) => {
        axios.delete('http://localhost:8000/api/people/' + personId)
            .then(res => {
                setUpdate(!update)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='row'>
            {
                <table class="table col-sm-6">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">FirstNAme</th>
                    <th scope="col">LastNAme</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {people.map((person, index) => (
                
                  <tr key={index}>
                    <th scope="row">{index +1}</th>
                    <td><Link  to={`/people/${person._id}`}> <p > {person.firstName}</p> </Link></td>
                    <td>{person.lastName},</td>
                    <td> <Link to={"/people/edit/" + person._id}>
                            Edit
                        </Link>
                        <Link key={index} to={`/people/${person._id}`}> <p >{person.lastName}, {person.firstName}</p> </Link>
                        <button onClick={(e)=>{deletePerson(person._id)}}>
                            Delete
                        </button>
</td>
                  </tr>
                  
                  ))}
                 
                </tbody>
              </table>

                
                       
                    
            }
        </div>
    )
}
export default PersonList;

