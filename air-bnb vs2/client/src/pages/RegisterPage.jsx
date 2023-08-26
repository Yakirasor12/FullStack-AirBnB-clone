import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'

export default function RegisterPage() {
  const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [redirect, setRedirect] = useState(false);

   async function registerUser (event) {
    event.preventDefault();
    try{
      await axios.post('/register', {
      name,
      email,
      password,
    });
    alert('Registration succsessful. Now u can log in')
    setRedirect(true)
    }catch(error){
      alert('Registration failed. Please try again later')
    }
   
  }

  if(redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text" 
          placeholder="Yakir Asor"
           value={name} 
           onChange={event => setName(event.target.value) } />
          <input type="email" 
          placeholder="Your@email.com"
           value={email} 
           onChange={event => setEmail(event.target.value)} />
          <input type="Password" 
          placeholder="Password" 
          value={password} 
          onChange={event => setPassword(event.target.value)} />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?
            <Link className="underline text-black" to={"/login"}>
              {" "}
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
