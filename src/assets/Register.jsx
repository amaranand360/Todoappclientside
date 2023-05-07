import React from 'react'
import { Link,Navigate } from "react-router-dom";
import "./register.css";
import {useContext, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { Context, server } from '../main';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated ,setIsAuthenticated,loading, setLoading}= useContext(Context)


    const submitHandler = async(e)=>{
      e.preventDefault();
      setLoading(true);
      //console.log({name,email,password})
      try {

      const {data} = await axios.post(`${server}/users/new`,{
        name,email,password
    },{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true,
    }
    );
    setName("");
    setEmail("");
    setPassword("");
    toast.success(data.message);
    setIsAuthenticated(true);
    setLoading(false);
  } 
  catch (error) {
    toast.error(error.response.data.message);
    // console.log(error);
    setIsAuthenticated(false);
    setLoading(false);

  }
  
  };

  if(isAuthenticated){
      return <Navigate to={"/"} /> ;
  }

  return (
    <div >
      <section>
      <form onSubmit={submitHandler} >
          <input
          value={name}
          onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
          <input
           value={email}
           onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="Password"
           
          />
          <button disabled={loading} type="submit">Sign Up</button>
          <h4>Or</h4>
          <h6>Already Have Account?</h6>
          <button className='login-btn'> <Link to="/login">Log In</Link> </button>


          
        </form>
      </section>
    </div>
  )
}

export default Register
