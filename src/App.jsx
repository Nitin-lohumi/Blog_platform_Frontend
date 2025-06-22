import React  from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Login from './LoginPages/Login';
import Home from './HomePages/Home';
import "./App.css"
import SignUp from './LoginPages/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import Post from './HomePages/Post';
import CreateBlog from './HomePages/CreateBlog';
function App() {
     return (
            <Router>
             <Routes>    
                <Route path="/" element={<Navigate to="/home" replace/>} />
                <Route path='/home' element={<Home/>}>
                  <Route path="posts" element={<Post />}/>
                  <Route path="createBlog" element={<CreateBlog />}/>
                  <Route path="UserProfile" element={<CreateBlog />}/>
                </Route>
                <Route path='/auth/signup' element={<SignUp/>}/>
                <Route path="/auth/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
