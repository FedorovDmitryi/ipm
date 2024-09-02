
import AuthPage from './pages/AuthPage'
import "./styles/main.css"

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import PrivateRoute from './components/PrivateRouter/PrivateRoute';
import List from './pages/List';
import Register from './pages/Register'
import OneTaskPage from './pages/OneTaskPage';
import UpdatePage from './pages/UpdatePage';
import CreateTaskPage from './pages/CreateTaskPage';
import AuthAdminPage from './pages/AuthAdminPage';
import ListAdmin from './pages/ListAdmin';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthPage/>}/>
          <Route path='/admin' element={<AuthAdminPage/>}/>
          <Route path='/register' element={<Register/>}/>

          <Route element={<PrivateRoute/>}>
            <Route path='/tasks' element={<List/>}/>
          </Route>

          <Route element={<PrivateRoute/>}>
            <Route path='/admin/tasks' element={<ListAdmin/>}/>
          </Route>

          <Route element={<PrivateRoute/>}>
            <Route path='/task/:taskId' element={<OneTaskPage/>}/>
          </Route>

          <Route element={<PrivateRoute/>}>
            <Route path='/task/update/:taskId' element={<UpdatePage/>}/>
          </Route>

          <Route element={<PrivateRoute/>}>
            <Route path='/task/create' element={<CreateTaskPage/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
