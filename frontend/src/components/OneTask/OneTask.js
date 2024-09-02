import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OneTask.css"

const OneTask = () => {
    const { taskId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch(`http://localhost:8080/api/tasks/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            setData(data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setError(error);
            setLoading(false);
        });
    }, [taskId]);

    const handleRedirect = () => {
        navigate(`/task/update/${taskId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data available</div>;

    return (
        <div className="task-details-container">
            <p>Дата создания: {data.created_at}</p>
            <p>Название: {data.name}</p>
            <form>
                <label htmlFor="type">Тип задачи:</label>
                <input type="text" readOnly name="type" id="type" value={data.type} />

                <label htmlFor="status">Статус задачи:</label>
                <input type="text" readOnly name="status" id="status" value={data.status} />   

                <label htmlFor="executor">Исполнитель:</label>
                <input type="text" readOnly name="executor" id="executor" value={data.executor?.email || ''} />   

                <label htmlFor="description">Описание:</label>
                <input type="text" readOnly name="description" id="description" value={data.description} />   

                <label htmlFor="deadline">Сроки:</label>
                <input type="date" readOnly name="deadline" id="deadline" value={data.deadline} />   
            </form>
            <button onClick={handleRedirect}>Редактировать</button>
        </div>
    );
};

export default OneTask;