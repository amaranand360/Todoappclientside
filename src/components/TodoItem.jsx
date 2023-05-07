import React from "react";
import "./TodoItem.css";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
const TodoItem = ({
  title,
  description,
  isCompleted,
  editHandler,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div className="todoitem">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div>
        <button onClick={()=> editHandler(id)} className="edit"> <BiEdit/> </button>
        <input className="update"
          onChange={() => updateHandler(id)}
          type="checkbox"
          checked={isCompleted}
        />
        <button className="delete" onClick={() => deleteHandler(id)} >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;