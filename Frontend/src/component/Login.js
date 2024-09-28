import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import AddResults from './AddResults';

function Login() {

  const [user, setName] = useState({name:'', password:''});
  const [validUser, setValidUser] = useState(null);
  const navigate = useNavigate();

  const handle = () =>{
    fetch("http://localhost:5555/verify", {
      method:"POST",
      body:JSON.stringify(user),
      headers:{
        "Content-Type":"application/json; charset=utf-8"
      }
    }).then((res)=>res.json()).then((res)=>{
      console.log(res);
      setValidUser(res);
    }).catch((error)=>{
      setValidUser(null);
      console.log(error);
    });
  }

  return (
    <div align="center" className='min-h-full'>
      <div className='p-5'>
      <h1 className='text-3xl'>Login</h1>
      </div>

      <table className='loginTable my-auto'>
        <tr>
          <td>
            <input type='text' placeholder='Enter Email' onChange={(e)=>{
            setName({...user, name:e.target.value});
            }} className='px-5 py-3 w-80 rounded-md'/>
          </td>
        </tr>

        <tr>
          <td>
              <input type='password' placeholder='Enter Password' onChange={(e)=>{
                setName({...user, password:e.target.value});
                }} className='px-5 py-3 w-80 rounded-md'/>
          </td>
        </tr>

        <tr>
          <td>
            <button onClick={()=>{
          handle();
          if(Boolean(validUser)){
            navigate("/addResults");
          }
        }} className='bg-orange-400 rounded-full w-80 py-3'><h1 className='font-mono text-white'>Login</h1></button>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default Login