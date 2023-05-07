import React from 'react';
import { useContext } from 'react';
import { Context } from '../main';
import "./profile.css";
import { Navigate } from 'react-router-dom';
//import axios from 'axios';

function Profile() {
  const {user,isAuthenticated,}= useContext(Context);

  // const  logoutHandler= async(e)=>{
  //   setLoading(true);
  //   try {
  //      await axios.get( `${server}/users/logout`,{
    
  //     withCredentials:true,
  //   });

  //   toast.success("Logout successfully");
  //   setIsAuthenticated(false);
  //   setLoading(false);

  // } 
  // catch (error) {
  //   toast.error(error.response.data.message);
  //   //console.log(error);
  //   setIsAuthenticated(true);
  //   setLoading(false);

  // }
  // }


  // console.log(user);
  if(!isAuthenticated){
    return <Navigate to={"/login"} /> ;
  }
  else{
  return (
    <div className='profile'>
      <h2>Name : {user?.name}</h2>  
      <h2>Email :{user?.email}</h2>  
      <button className='logout-btn'> Logout</button>    
    </div>
  )
    }
}

export default Profile;
