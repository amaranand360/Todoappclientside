import axios from 'axios';
import React, { useState,useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import "./Home.css";
import { Context } from '../main';
import { Navigate } from 'react-router-dom';
import { server } from '../main';


function Home() {
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [loading,setLoading]=useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const {isAuthenticated }= useContext(Context);
  const [tasktype, setTasktype] = useState(false);
  const [idvlaue,setIdvalue]=useState(121);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(`${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const editHandler = async (id) => {
    setTasktype((prev) => !prev);
    // console.log(id);
    setIdvalue(id);
  };

  const editTaskHandler = async()=>{

    try {
      setLoading(true);
      // console.log({title,description});
      // console.log(idvlaue);
      const { data } = await axios.put(`${server}/task/${idvlaue}/edit`,
        {title,description},
        {
          withCredentials: true,
        },
        
      );

      toast.success(data.message);
      // setRefresh((prev) => !prev);
      setTasktype((prev) => !prev);
      setLoading(false);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };



  const submitTaskhandler=async(e)=>{
    e.preventDefault();
    try {
    setLoading(true);
    const { data }=await axios.post(`${server}/task/new`,{
      title,
      description
    },{
      withCredentials:true,
      headers:{
        "Content-Type":"application/json",
      },
    }
    );
    setTitle("");
    setDescription("");
    setRefresh((prev) => !prev);
    toast.success(data.message);
    setLoading(false);
    
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }



  useEffect(() => {
    axios.get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
        //console.log(res.data.tasks);

      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if(!isAuthenticated){
    return <Navigate to={"/login"} /> ;
  }

  return (
    <div className='homepage'>
    <div className='container'>

<form onSubmit={tasktype?editTaskHandler:submitTaskhandler}>
          
          <input
           value={title}
           onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Task Title here!"
            required
          />
          <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
            type="text"
            required
            placeholder="Task Description..."
           
          />
           <button  onSubmit={editTaskHandler} disabled={loading} type="submit" className='task-btn' >
           {tasktype?<h3>Save Task</h3>:<h3>Add Task</h3>}</button>
           
        </form> 

      <div className='todocontainer'>
        <h2>All Current Tasks List</h2>
      {tasks.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            editHandler={editHandler}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}

      </div>

    </div>
    </div>
  );
}

export default Home
