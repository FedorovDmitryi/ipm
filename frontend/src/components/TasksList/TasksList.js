import "./TasksList.css"
import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from "react-router-dom";
import 'reactjs-popup/dist/index.css';

const TasksList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch('http://localhost:8080/api/tasks',{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        }}
    )
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

    return (    
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Тип</th>
                        <th>Исполнитель</th>
                        <th>Прогресс</th>
                        <th>Сроки</th>
                    </tr>
                </thead>    
                <tbody>
                    {data.map((task, index) =>(
                        <tr key = {index}>
                            <td>{task.name}</td>
                            <td>{task.type}</td>
                            <td>{task.executor.id}</td>
                            <td>{task.status}</td>
                            <td>{task.deadline}</td>
                            <td><Link to={`/task/${task.id}`}>Подробнее</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     );
}
 
export default TasksList;