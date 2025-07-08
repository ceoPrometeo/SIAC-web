import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../../api/conexionesApi.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
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
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Correo o contraseña inválidos');
    } finally {
      setLoading(false);
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
          <button
            className="login-button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
          {error && <p className="login-error">{error}</p>}
        </div>
      </div>
    </div>
  );
}
