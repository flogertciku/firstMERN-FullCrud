import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const PersonList = (props) => {
     const { people, setPeople, update,setUpdate ,socket} = props;
   
    useEffect(() => {
        axios.get("http://localhost:8000/api/people")
            .then((res) => {
                // console.log(res.data);
                setPeople(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            socket.on('toClient', (person) => {
                console.log("ne react therritet ")
                // setPeople([...people,persons]);
       
                setUpdate(!update)
              });
              // return () => socket.emit("disconnect");
    }, [update])

    const deletePerson = (personId) => {
        axios.delete('http://localhost:8000/api/people/' + personId)
            .then(res => {
                // setUpdate(!update)
                socket.emit("toServer", res.data);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='col-sm-6'>
            {
                <table class="table  table-hover">
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
                    <td className='align-items-center  '><Link  to={`/people/${person._id}`}> <p > {person.firstName}</p> </Link></td>
                    <td className='align-items-center  '>{person.lastName}</td>
                    <td className='row justify-content-around  '> <Link className=' btn-sm btn btn-secondary mb-2' to={"/people/edit/" + person._id}>
                            Edit
                        </Link>

                        
                        <button className=' btn btn-danger btn-sm' onClick={(e)=>{deletePerson(person._id)}}>
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

