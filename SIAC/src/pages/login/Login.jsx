import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';

import logoImage from '../../assets/logo.png';
import { login } from '../../api/conexionesApi.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Debes ingresar correo y contraseña');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        setEmail('');
        setPassword('');
        navigate('/dashboard');
      } else {
        setError('Correo o contraseña inválidos');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Correo o contraseña inválidos');
    } finally {
      setLoading(false);
    }
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
          <div className="login-box">
            <h2 className="login-title">Inicio de Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <span className="input-icon"><FaUser /></span>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="login-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <span className="input-icon"><FaLock /></span>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-login"
                disabled={loading}
              >
                {loading ? 'Ingresando…' : 'Ingresar'}
              </button>

              {error && <p className="login-error">{error}</p>}

              <div className="login-links">
                <a href="#">¿Olvidaste tu contraseña?</a>
                <a href="#">Crear cuenta →</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
