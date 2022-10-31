import React, { useState } from 'react';
import Swal from 'sweetalert2';
import TaskList from '../TaskList/TaskList';

const TaskForm = () => {

    const [inputValues, setInputValues] = useState({ task: '', filter: '' });
    const [tasks, setTasks] = useState([]);

    const handleALLinputFields = (event) => {
        setInputValues({ ...inputValues, [event.target.name]: event.target.value });
    }
    //console.log(inputValues);

    const taskSubmitHandler = (event) => {
        event.preventDefault();
        const taskInputValue = inputValues?.task;
        if (!taskInputValue) {
            Swal.fire({
                icon: 'error',
                title: 'Please Fill The Task',
            })
            return;
        }
        setTasks([...tasks, { task: taskInputValue }]);
        setInputValues({ task: '' });
    }

    const handleDeleteTask = (event, index) => {
        Swal.fire({
            title: 'Are You Sure?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                //React Code
                const tempTasks = [...tasks];
                tempTasks.splice(index, 1);
                setTasks(tempTasks);
                //React Code
                Swal.fire('Task Deleted Successfully!', '', 'success');
            } else if (result.isDenied) {
                Swal.fire('Task is not deleted Successfully!', '', 'info');
            }
        })
    }

    const handleClearAllBtn = (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Are You Sure?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                //React Code
                setTasks([]);
                //React Code
                Swal.fire('All Tasks are Deleted Successfully!', '', 'success');
            } else if (result.isDenied) {
                Swal.fire('All Tasks is not deleted Successfully!', '', 'info');
            }
        })
    }
    const inputFilterValue = inputValues.filter ? (inputValues.filter).toLowerCase() : '';
    const filterTasks = tasks.filter(sinleTask => sinleTask.task.toLowerCase().includes(inputFilterValue));

    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">
                                Task List
                            </span>
                            <div className="row">
                                <form id="task-form" onSubmit={taskSubmitHandler}>
                                    <div className="input-field col s12">
                                        <input type="text" name="task" id="task"
                                            onChange={handleALLinputFields}
                                            value={inputValues.task}
                                        />
                                        <label>new task</label>
                                    </div>
                                    <button className="waves-effect waves-light btn" type="submit">Add Task</button>
                                </form>
                            </div>
                        </div>
                        <TaskList 
                        tasks={filterTasks} 
                        handleALLinputFields={handleALLinputFields} 
                        handleDeleteTask={handleDeleteTask} 
                        handleClearAllBtn={handleClearAllBtn}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;
