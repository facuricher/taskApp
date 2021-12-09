import React, {useState} from "react";

export const TasksCreator = props=>{

    const [newTaskName, setNewTaskName]= useState('');

    const upDateNewTaskValue = e => setNewTaskName(e.target.value)

    const createNewTask =()=>{
        props.callback(newTaskName)
        setNewTaskName('')
    }


    return (
        <div className='my-1'>
            <input 
            type="text"
            className="form-control"
            value={newTaskName}
            onChange={upDateNewTaskValue}
            />
            <button 
            className="btn btn-primary mt-1" 
            onClick={createNewTask}>
                Add
            </button>
        </div>

    )
}