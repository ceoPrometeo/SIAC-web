const API_URL = 'http://localhost:8080/api';

export const registrarCliente = async (clienteDto) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/cliente`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(clienteDto)
  });

  if (!response.ok) {
    let msg = 'Error al registrar cliente';
    try {
      const err = await response.json();
      msg = err.message || msg;
    } catch {}
    throw new Error(msg);
  }

  const data = await response.json();
  if (!data.data) throw new Error('El servidor no devolvió los datos esperados');
  return data.data;
};

export const obtenerClientes = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/cliente/obtenerTodos`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Error al obtener los clientes');

  const data = await response.json();
  if (!data.data) throw new Error('El servidor no devolvió los datos esperados');
  return data.data;
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ correo: email, password })
  });

  if (!response.ok) throw new Error('Credenciales incorrectas');

  const data = await response.json();
  const token = data.body.token;

  if (token) {
    localStorage.setItem('token', token);
    return true;
  } else {
    throw new Error('No se recibió el token del servidor');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};
