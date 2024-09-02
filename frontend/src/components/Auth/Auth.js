import { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem('authToken', data.access_token);
        console.log('Токен установлен:', data.access_token);
        navigate('/tasks');
      } else {
        console.error('Ошибка авторизации:', data.message);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }

    const redirect = () => {
      navigate('/admin')
    }
  };

  return (
    <div>
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
      <button onClick={handleLogin}>Войти</button>
      <Link to='/admin'>Admin</Link>
    </div>
  );
};

export default Auth;