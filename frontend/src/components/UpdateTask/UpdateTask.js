import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './UpdateTask.css';

const TASK_TYPES = [
  { value: 'TASK', label: 'TASK' },
  { value: 'EPIC', label: 'EPIC' },
  { value: 'MILESTONE', label: 'MILESTONE' }
];

const TASK_STATUSES = [
  { value: 'СОЗДАНА', label: 'СОЗДАНА' },
  { value: 'В РАБОТЕ', label: 'В РАБОТЕ' },
  { value: 'ЗАВЕРШЕНА', label: 'ЗАВЕРШЕНА' }
];

const UpdateTask = () => {
    const [data, setData] = useState({});
    const [users, setUsers] = useState([]);
    const { taskId } = useParams();
    const navigate = useNavigate();
    const auth = localStorage.getItem('authToken');

    useEffect(() => {
        fetch(`http://localhost:8080/api/tasks/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${auth}`,
            }
        })
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Ошибка при загрузке данных задачи:', error));

        fetch('http://localhost:8080/api/users', {
            headers: {
                'Authorization': `Bearer ${auth}`,
            }
        })
        .then(response => response.json())
        .then(users => setUsers(users))
        .catch(error => console.error('Ошибка при загрузке данных пользователей:', error));
    }, [taskId, auth]);

    const handleUpdate = async (event) => {
        event.preventDefault();

        const updatedData = {
            type: event.target.type.value,
            name: event.target.name.value,
            status: event.target.status.value,
            executor: event.target.executor.value,
            description: event.target.description.value,
            deadline: event.target.deadline.value
        };

        try {
            const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                navigate(`/task/${taskId}`);
            } else {
                console.error('Ошибка при обновлении задачи');
            }
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
        }
    };

    const handleDelete = async () => {

        const confirmed = window.confirm('Вы уверены, что хотите удалить эту задачу?');
        if (!confirmed) return;

        try {
            const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${auth}`,
                }
            });

            if (response.ok) {
                console.log('Задача удалена');
                navigate('/tasks');
            } else {
                console.error('Ошибка при удалении задачи');
            }
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
        }
    };
    return (
        <div className="task-form-container">
            <div className="task-form">
                <p>Дата создания: {data.created_at}</p>
                <p>Название: {data.name}</p>
                <form onSubmit={handleUpdate}>
                    <label htmlFor="type">Тип задачи:</label>
                    <select
                        name="type"
                        id="type"
                        required
                    >
                        <option value="">--Выберите тип задачи--</option>
                        {TASK_TYPES.map(taskType => (
                            <option key={taskType.value} value={taskType.value}>
                                {taskType.label}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="status">Статус задачи:</label>
                    <select
                        name="status"
                        id="status"
                        required
                    >
                        <option value="">--Выберите статус задачи--</option>
                        {TASK_STATUSES.map(taskStatus => (
                            <option key={taskStatus.value} value={taskStatus.value}>
                                {taskStatus.label}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="executor">Исполнитель:</label>
                    <input 
                        type="text" 
                        name="executor" 
                        id="executor" 
                        defaultValue={data.executor?.email || ''} 
                    />   

                    <label htmlFor="description">Описание:</label>
                    <input 
                        type="text" 
                        name="description" 
                        id="description"
                        defaultValue={data.description || ''} 
                    />   

                    <label htmlFor="deadline">Сроки:</label>
                    <input 
                        type="date" 
                        name="deadline" 
                        id="deadline"
                        defaultValue={data.deadline || ''} 
                    />   

                    <input type="submit" value="Редактировать" />
                        <button onClick={handleDelete} type="submit" value="Удалить">Удалить</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;