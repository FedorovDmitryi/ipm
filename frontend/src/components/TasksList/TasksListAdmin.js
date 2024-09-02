import "./TasksList.css"
import { useState, useEffect } from 'react';
import React from 'react';
import { Link, Navigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';

const TasksList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch('http://localhost:8080/api/tasks/admin',{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        }}
    )
        .then(response => {
            if (!response.ok){
                Navigate('/')
            }
            return response.json();
        })
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

    return (    
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID задачи</th>
                        <th>Название</th>
                        <th>Тип</th>
                        <th>Исполнитель</th>
                        <th>Статус выполнения</th>
                        <th>Сроки</th>
                        <th>Действия</th>
                    </tr>
                </thead>    
                <tbody>
                    {data.map((task, index) => (
                        <tr key={index}>
                            <td>{task.id}</td>
                            <td>{task.name}</td>
                            <td>{task.type}</td>
                            <td>{task.executor.email}</td>
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