/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Login from './components/login';
import Register from './components/Register';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <button onClick={() => setIsLogin(true)}>Login</button>
      <button onClick={() => setIsLogin(false)}>Register</button>
      {isLogin ? <Login /> : <Register />}
    </div>
  );
};

export default App;
