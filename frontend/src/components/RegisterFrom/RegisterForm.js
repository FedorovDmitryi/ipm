import React, { useState } from 'react';
import "./RegisterForm.css"

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeat_password, setRepeatPassword] = useState('');
  const [roles, setRoles] = useState(['user']);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, repeat_password, roles }),
      });

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem('authToken', data.access_token);
        console.log('Токен установлен:', data.access_token);
      } else {
        console.error('Ошибка авторизации:', data.message);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const handleRoleChange = (event) => {
    setRoles([event.target.value]);
  };

  return (
    <div className="login-form">
        <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
            type="password" 
            placeholder="Пароль" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
        />
        <input 
            type="password" 
            placeholder="Повторите пароль" 
            value={repeat_password} 
            onChange={(e) => setRepeatPassword(e.target.value)} 
        />
        <select 
            value={roles} 
            onChange={handleRoleChange}
        >
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select> 

        <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default Auth;