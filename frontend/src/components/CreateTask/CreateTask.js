import { useEffect, useState } from "react";

const TASK_TYPES = [
  { value: 'TASK', label: 'TASK' },
  { value: 'EPIC', label: 'EPIC' },
  { value: 'MILESTONE', label: 'MILESTONE' }
];
const CreateTask = () => {
  const [users, setUsers] = useState([]);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [executor, setExecutor] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Ошибка получения пользователей:', error));
  }, []);

  const handleCreateTask = async () => {

    try {
      const response = await fetch('http://localhost:8080/api/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          name,
          type,
          status,
          executor,
          description,
          deadline,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Задача успешно создана:', data);
        setName('');
        setType('');
        setStatus('');
        setExecutor('');
        setDescription('');
        setDeadline('');
      } else {
        const errorData = await response.json();
        console.error('Ошибка создания задачи:', errorData.message);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  return (
    <div>
      <label htmlFor="name">Название задачи:</label>
      <input 
        type="text" 
        name="name" 
        id="name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="type">Тип задачи:</label>
      <select
        name="type"
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">--Выберите тип задачи--</option>
        {TASK_TYPES.map(taskType => (
          <option key={taskType.value} value={taskType.value}>
            {taskType.label}
          </option>
        ))}
      </select>

      <label htmlFor="executor">Исполнитель:</label>
      <select
        name="executor"
        id="executor"
        value={executor}
        onChange={(e) => setExecutor(e.target.value)}
      >
        <option value="">--Выберите исполнителя--</option>
        {users
          .filter(user => !user.roles.includes('admin'))
          .map(user => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
        ))}
      </select>
      <label htmlFor="description">Описание:</label>
      <input 
        type="text" 
        name="description" 
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="deadline">Дедлайн:</label>
      <input 
        type="date" 
        name="deadline" 
        id="deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button onClick={handleCreateTask}>Создать задачу</button>
    </div>
  );
}

export default CreateTask;