import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-header">
        <div className="franja-claro" />
        <div className="franja-morado" />
      </div>

      <div className="login-content">
        <div className="login-box">
          <h2 className="login-title">Inicio de Sesión</h2>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
}
