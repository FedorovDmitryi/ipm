import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const [isAuthorized, setIsAuthorized] = useState(true);
    const auth = localStorage.getItem('authToken');

    useEffect(() => {
        if (auth) {
            fetch('http://localhost:8080/api/auth/ping', {
                headers: {
                    'Authorization': `Bearer ${auth}`,
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    localStorage.removeItem('authToken');
                    setIsAuthorized(false);
                }
            })
            .catch(error => {
                console.error('Ошибка при проверке авторизации:', error);
                setIsAuthorized(false);
            });
        } else {
            setIsAuthorized(false);
        }
    }, [auth]);

    return isAuthorized ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;