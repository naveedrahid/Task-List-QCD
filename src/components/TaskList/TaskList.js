import React from 'react';

const TaskList = (props) => {

    const { tasks, handleALLinputFields, handleDeleteTask, handleClearAllBtn} = props;

    return (
        <div className="card-action">
            <h5 id="task-title">Tasks</h5>
            <div className="input-field col s12">
                <input type="text" name="filter" id="filter" onChange={handleALLinputFields} />
                <label>Filter Task</label>
            </div>

            {tasks.length > 0 ?
                <ul className="collection">
                    {
                        tasks.map((singleTask, index) => {
                            return (
                                <li key={index} className="collection-item">{singleTask.task}
                                    <a className="delete-item secondary-content" onClick={(event) => handleDeleteTask (event, index)}>
                                        <i className="fa fa-remove"></i>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul> :
                <h5>No Task Found!</h5>
            }
            <a href="" className="clear-tasks btn black" onClick={handleClearAllBtn}>Clear Task</a>
        </div>
    );
}

export default TaskList;
