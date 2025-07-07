import './App.css';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Clientes from './pages/clientes/Clientes.jsx';
import Renovados from './pages/renovados/Renovados.jsx';
import Pendientes from './pages/pendientes/Pendientes.jsx';
import Vencidos from './pages/vencidos/Vencidos.jsx';
import Login from './pages/login/Login.jsx'; // 👈 importar Login
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Sidebar() {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? 'active' : 'text-white');

  return (
    <div className="sidebar-fixed d-flex flex-column flex-shrink-0 p-3">
      <Link to="/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">Algo Global</span>
      </Link>

      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/clientes" className={`nav-link ${isActive('/clientes')}`}>
            Clientes
          </Link>
        </li>
        <li>
          <Link to="#" className="nav-link text-white">Incrementos</Link>
        </li>
      </ul>

      <div className="dropdown mt-auto">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  const hideSidebarPaths = ['/', '/login']; // 👈 rutas donde NO se debe mostrar el sidebar

  const showSidebar = !hideSidebarPaths.includes(location.pathname);

  return (
    <div className="d-flex">
      {showSidebar && <Sidebar />}
      <div className="main-content" style={{ flexGrow: 1, overflowX: 'hidden' }}>
        <Routes>
          <Route path="/" element={<Login />} /> {/* 👈 login por defecto */}
          <Route path="/login" element={<Login />} />
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
