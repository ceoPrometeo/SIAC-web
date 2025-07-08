const API_URL = 'http://localhost:8080/api';

/**
 * Registra un nuevo cliente.
 * @param {Object} clienteDto - Objeto DTO del cliente con contratos.
 * @returns {Promise<Object>} - Cliente registrado.
 */
export const registrarCliente = async (clienteDto) => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${API_URL}/cliente`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(clienteDto)
    });

    if (!response.ok) {
      let errorMsg = 'Error al registrar cliente';
      try {
        const err = await response.json();
        errorMsg = err.message || errorMsg;
      } catch {
        // respuesta sin json
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    if (!data.data) {
      throw new Error('El servidor no devolvió los datos esperados');
    }
    return data.data; // Cliente registrado
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Inicia sesión y guarda el token JWT en localStorage.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<boolean>} - true si login exitoso.
 */
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo: email, password })
    });

    if (!response.ok) {
      throw new Error('Credenciales incorrectas');
    }

    const data = await response.json();

    // Aquí manejamos dos posibles estructuras según tu backend
    const token = data.body.token;

    if (token) {
      localStorage.setItem('token', token);
      return true;
    } else {
      throw new Error('No se recibió el token del servidor');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Cierra la sesión eliminando el token.
 */
export const logout = () => {
  localStorage.removeItem('token');
};

/**
 * Recupera el token JWT almacenado.
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem('token');
};
