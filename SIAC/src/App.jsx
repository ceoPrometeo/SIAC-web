import './App.css';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Clientes from './pages/clientes/Clientes.jsx';
import Renovados from './pages/renovados/Renovados.jsx';
import Pendientes from './pages/pendientes/Pendientes.jsx';
import Vencidos from './pages/vencidos/Vencidos.jsx';
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Sidebar() {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? 'active' : 'text-white');

  return (
    <div className="sidebar-fixed d-flex flex-column flex-shrink-0 p-3">
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap" /></svg>
        <span className="fs-4">Algo Global</span>
      </Link>

      <hr /> 

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home" /></svg>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/clientes" className={`nav-link ${isActive('/clientes')}`}>
            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2" /></svg>
            Clientes
          </Link>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#table" /></svg>
            Incrementos
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#grid" /></svg>
            
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle" /></svg>
          </a>
        </li>
      </ul>

      {/* ❌ Línea innecesaria eliminada */}

      <div className="dropdown mt-auto">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content" style={{ flexGrow: 1, overflowX: 'hidden' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/renovados" element={<Renovados />} />
          <Route path="/pendientes" element={<Pendientes />} />
          <Route path="/vencidos" element={<Vencidos />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;