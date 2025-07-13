import React from 'react';
import './Login.css';
<<<<<<< HEAD
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
=======
import { FaUser, FaLock } from 'react-icons/fa';
import logoImage from '../../assets/logo.png';


const Login = ({ onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); // ⚡ Activa autenticación
>>>>>>> 9bc678fb53ff91fa2e625b2e4f6dac81b831ea23
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 9bc678fb53ff91fa2e625b2e4f6dac81b831ea23
        </div>
      </div>
    </div>
  );
};

export default Login;
