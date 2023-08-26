import axios from 'axios';
import React, { useContext } from 'react'
import { useState } from 'react';
import {Link, Navigate} from "react-router-dom"
import { UserContext } from '../UserContext';




export default function LoginPage() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ redirect, setRedirect] = useState(false);
  const  {setUser} = useContext(UserContext);

  
  async function handleLoginSubmit(event) {
    event.preventDefault();
    const loginData = {
      email:email.toLowerCase(),
      password
    }
       const response = await axios.post("/login", loginData);
       if(response.data !== 'not found'){
       setUser(response.data)
      alert("Login successfuly");
      setRedirect(true)
       }else {
        alert('Password or email incorrect')
        setEmail('')
        setPassword('')
       }
  }
  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className='mb-64'>
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email" 
          placeholder="Your@email.com" 
          value={email}
          onChange={event => setEmail(event.target.value)} />
          <input type="Password" 
          placeholder="Password" 
          value={password}
          onChange={event => setPassword(event.target.value)}/>
          <button className="primary">Login</button>
          <div className='text-center py-2 text-gray-500'>
            Don't have an account yet?
           <Link className='underline text-black' to={'/register'}> Register Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
