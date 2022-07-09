import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from './contexts/UserContext';
import Protected from './components/Protected';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { getUser } from './api/user';

import './App.css';
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    getUser().then(user => {
      if (!user) {
        toast.error("Some error message");
      }
      setUser(user)    
    })
  }, []);

  return (
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
        <ToastContainer />
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/login' element={<Login />}/>
            <Route exact path='/register' element={<Register />}/>
            <Route exact path='/resetpassword/:token' element={<ResetPassword />}/>
            <Route exact path='/forgotpassword' element={<ForgotPassword />}/>
            <Route path="/dashboard" element={
              <Protected isLoggedIn={user}>
                <Dashboard />
              </Protected>}
            />
          </Routes>
          </UserContext.Provider>
      </Router>
  )
}

export default App;