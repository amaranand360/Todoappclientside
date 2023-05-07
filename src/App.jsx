
import './App.css';
import {BrowserRouter as Router, Route ,Routes } from "react-router-dom";
import Header from './components/Header';
import  Home from './assets/Home';

import  Profile from './assets/Profile';
import  Login from './assets/Login';
import  Register from './assets/Register';
import { Toaster } from 'react-hot-toast';
import { useContext, useEffect } from 'react';
import axios from "axios";
import { Context, server } from './main';

function App() {
  const {setUser,setIsAuthenticated,setLoading} = useContext(Context);

  useEffect(() => {
    setLoading(true)
    axios.get(`${server}/users/me`,{
      withCredentials:true,
  }).then( (res)=>{
    setIsAuthenticated(true);
    setUser(res.data.user);
    setLoading(false);
  }).catch((error)=>{
    setUser({});
    setIsAuthenticated(false);
    setLoading(false)
  })
    },[])

  return (
    <div className='app'>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={< Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

        </Routes>
        <Toaster />
      </Router>
      
    </div>
  )
}

export default App
