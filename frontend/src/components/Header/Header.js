import { useEffect, useState } from "react";
import "./Header.css"
import { Link } from "react-router-dom";

const Header = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');

        if (authToken) {
            fetch('http://localhost:8080/api/users/username', {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 401) {
                        localStorage.removeItem('authToken');
                        return null;
                    }
                })
            .then(data => {
                if (data) {
                    setData(data);
                }
            })
        }
    }, []);

    return ( 
        <header className="sticky-header">
            <div className="container">
                <h1><Link to='/'>IPM</Link></h1>
                <nav>
                    <ul>
                        <li><Link to='/admin/tasks'>Список документов Админ</Link></li>
                        <li><Link to='/tasks'>Список документов</Link></li>
                        <li><Link to='/task/create'>Создание</Link></li>
                        <li><p>{data.username}</p></li>
                    </ul>
                </nav>
            </div>
        </header>
     );
}
 
export default Header;