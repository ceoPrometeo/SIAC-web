import React from 'react';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import logoImage from '../../assets/logo.png';


const Login = ({ onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); // ⚡ Activa autenticación
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          {/* Círculos decorativos */}
          <span className="circle-1"></span>
          <span className="circle-2"></span>
          <span className="circle-3"></span>
          <span className="circle-4"></span>
          <img src={logoImage} alt="Logo decorativo" className="decorative-logo" />
        </div>

        <div className="login-right">
          <h2 className="login-title">User Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-icon"><FaUser /></span>
              <input type="text" placeholder="Username" required />
            </div>
            <div className="input-group">
              <span className="input-icon"><FaLock /></span>
              <input type="password" placeholder="Password" required />
            </div>
            <button type="submit" className="btn-login">LOGIN</button>
            <div className="login-links">
              <a href="#">Forgot Username? Password?</a>
              <a href="#">Create Your Account →</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
