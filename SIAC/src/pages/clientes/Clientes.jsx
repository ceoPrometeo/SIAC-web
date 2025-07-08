import React, { useState } from "react";
import Swal from "sweetalert2";
import "bulma/css/bulma.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../clientes/Clientes.css"; // Asegúrate de que esta ruta sea correcta
import eyeIcon from "../../assets/eye.png"; // Asegúrate de que esta ruta sea correcta
import editIcon from "../../assets/edit.png"; // Asegúrate de que esta ruta sea correcta

// Importa los componentes de React-Bootstrap. Son necesarios para los Modals.
import { Modal, Button, Form } from 'react-bootstrap';

// URL base de tu API de Spring Boot
const API_URL = 'http://localhost:8080/api';

// --- DEFINICIÓN DE COMPONENTES DE MODAL (TODO EN ESTE ARCHIVO) ---

// Componente para el Modal de Agregar Cliente (con los campos y estilos originales)
function AgregarClienteModal({ show, handleClose, onAgregar }) {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        cuentaMT5: '',
        monto: '',
        fecha_inicio: '',
        fecha_renovacion: '',
        estatus_renovacion: true, // Default to true as per your original structure
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAgregar(formData);
        // Reset form data and close modal will be handled after API response in parent
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {/* Input fields for Cliente */}
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
                    </Form.Group>

                    <hr /> {/* Separator for contract details */}

                    {/* Input fields for Contrato */}
                    <Form.Group className="mb-3">
                        <Form.Label>Cuenta MT5</Form.Label>
                        <Form.Control type="text" name="cuentaMT5" value={formData.cuentaMT5} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Monto</Form.Label>
                        <Form.Control type="number" name="monto" value={formData.monto} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de Inicio</Form.Label>
                        <Form.Control type="date" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de Renovación</Form.Label>
                        <Form.Control type="date" name="fecha_renovacion" value={formData.fecha_renovacion} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="switch"
                            id="estatus_renovacion_switch"
                            label="Estatus Renovación"
                            name="estatus_renovacion"
                            checked={formData.estatus_renovacion}
                            onChange={handleChange}
                        />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                        Registrar Cliente
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

// Componente para el Modal de Cargar Clientes (versión básica)
function CargarClientesModal({ show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cargar Clientes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Aquí podrías implementar la lógica para cargar todos los clientes desde el backend.</p>
                <p>Por ahora, este es un placeholder.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

// Componente para el Modal de Editar Cliente (versión básica)
function EditarClienteModal({ show, handleClose, clienteSeleccionado, onGuardar }) {
    const [editData, setEditData] = useState(clienteSeleccionado || {});

    React.useEffect(() => {
        setEditData(clienteSeleccionado || {});
    }, [clienteSeleccionado]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onGuardar(editData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {clienteSeleccionado ? (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" value={editData.id || ''} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name="nombre" value={editData.nombre || ''} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Monto</Form.Label>
                            <Form.Control type="number" name="monto" value={editData.monto || 0} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de Contrato</Form.Label>
                            <Form.Control type="date" name="fecha" value={editData.fecha || ''} onChange={handleChange} />
                        </Form.Group>
                        {/* Agrega más campos para editar si los necesitas, recuerda que deben coincidir con la estructura de clienteSeleccionado */}
                    </Form>
                ) : (
                    <p>No se ha seleccionado ningún cliente para editar.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

// Componente para el Modal de Ver Cliente (versión básica)
function VerClienteModal({ show, handleClose, clienteSeleccionado }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {clienteSeleccionado ? (
                    <div>
                        <p><strong>ID:</strong> {clienteSeleccionado.id}</p>
                        <p><strong>Nombre:</strong> {clienteSeleccionado.nombre}</p>
                        <p><strong>Monto:</strong> ${parseFloat(clienteSeleccionado.monto).toLocaleString()}</p>
                        <p><strong>Fecha de Contrato:</strong> {clienteSeleccionado.fecha}</p>
                        <p><strong>Estado Activo:</strong> {clienteSeleccionado.activo ? 'Sí' : 'No'}</p>
                        {/* Agrega más detalles del cliente aquí si los tienes disponibles en el objeto clienteSeleccionado */}
                    </div>
                ) : (
                    <p>No se ha seleccionado ningún cliente para ver.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

// --- FIN DE DEFINICIÓN DE COMPONENTES DE MODAL ---


// --- COMPONENTE PRINCIPAL Clientes ---
export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showCargarModal, setShowCargarModal] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showVerModal, setShowVerModal] = useState(false);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [animAgregar, setAnimAgregar] = useState(false);
    const [animCargar, setAnimCargar] = useState(false);

    const toggleActivo = (id) => {
        const actualizados = clientes.map((c) =>
            c.id === id ? { ...c, activo: !c.activo } : c
        );
        setClientes(actualizados);
    };

    /**
     * Maneja el envío del formulario para agregar un nuevo cliente a la base de datos.
     * @param {object} nuevo - Los datos del nuevo cliente, incluyendo los del contrato.
     */
    const handleAgregarCliente = async (nuevo) => {
        // Validaciones básicas de campos principales del cliente
        if (!nuevo.nombre || !nuevo.correo || !nuevo.telefono) {
            Swal.fire("Atención", "Por favor llena nombre, correo y teléfono.", "warning");
            return;
        }
        // Validaciones básicas de campos del contrato
        if (!nuevo.cuentaMT5 || !nuevo.monto || !nuevo.fecha_inicio || !nuevo.fecha_renovacion) {
            Swal.fire("Atención", "Por favor llena todos los campos del contrato.", "warning");
            return;
        }

        // Construir el DTO que espera el backend (ClienteDto)
        const clienteDto = {
            nombre: nuevo.nombre,
            correo: nuevo.correo,
            estado: true, // Por defecto, un nuevo cliente se crea como activo
            telefono: nuevo.telefono,
            contratos: [ // Los contratos se envían como un array, incluso si es uno solo
                {
                    cuentaMT5: nuevo.cuentaMT5,
                    monto: parseFloat(nuevo.monto), // Asegúrate de que el monto sea un número
                    fecha_inicio: nuevo.fecha_inicio,
                    fecha_renovacion: nuevo.fecha_renovacion,
                    estatus_renovacion: nuevo.estatus_renovacion ?? true, // Si no se especifica, true por defecto
                },
            ],
        };

        try {
            // Obtener el token de autenticación de localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire("Error", "No hay token de autenticación. Por favor inicia sesión.", "error");
                return;
            }

            // Realizar la petición POST a tu API
            const response = await fetch(`${API_URL}/cliente`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Incluir el token en el header de autorización
                },
                credentials: 'include', // Para enviar cookies (si usas sesiones o CSRF tokens)
                body: JSON.stringify(clienteDto), // Convertir el DTO a JSON string
            });

            // Verificar si la respuesta fue exitosa (status 2xx)
            if (!response.ok) {
                // Leer el mensaje de error del cuerpo de la respuesta si no fue exitosa
                const err = await response.json();
                throw new Error(err.message || 'Error desconocido al registrar cliente');
            }

            // Procesar la respuesta exitosa
            const data = await response.json();
            const clienteRegistrado = data.data; // Tu ApiResponse.data contiene el objeto Cliente

            if (!clienteRegistrado || !clienteRegistrado.id) {
                Swal.fire("Error", "El servidor no devolvió un cliente válido después del registro.", "error");
                return;
            }

            // Actualizar el estado de clientes para mostrar el nuevo cliente en la tabla
            setClientes((prev) => [
                ...prev,
                {
                    id: clienteRegistrado.id,
                    nombre: clienteRegistrado.nombre,
                    // Acceder al monto y fecha del primer contrato, asumiendo que al menos uno existe
                    monto: clienteRegistrado.contratos?.[0]?.monto || 0,
                    fecha: clienteRegistrado.contratos?.[0]?.fecha_inicio || "",
                    activo: clienteRegistrado.estado, // Usar el estado devuelto por el backend
                },
            ]);

            // Cerrar el modal y mostrar mensaje de éxito
            setShowModal(false);
            Swal.fire("Éxito", "Cliente registrado correctamente.", "success");

        } catch (err) {
            // Mostrar mensaje de error si la petición falla
            console.error("Error al registrar cliente:", err);
            Swal.fire("Error", "Error al registrar cliente: " + err.message, "error");
        }
    };

    const handleEditarCliente = (editado) => {
        const actualizados = clientes.map((c) =>
            c.id === editado.id ? { ...editado } : c
        );
        setClientes(actualizados);
    };

    const triggerAnim = (tipo) => {
        if (tipo === "agregar") {
            setAnimAgregar(true);
            setTimeout(() => {
                setAnimAgregar(false);
                setShowModal(true);
            }, 200);
        } else if (tipo === "cargar") {
            setAnimCargar(true);
            setTimeout(() => {
                setAnimCargar(false);
                setShowCargarModal(true);
            }, 200);
        }
    };

    const abrirModalEditar = (cliente) => {
        setClienteSeleccionado(cliente);
        setShowEditarModal(true);
    };

    const abrirModalVer = (cliente) => {
        setClienteSeleccionado(cliente);
        setShowVerModal(true);
    };

    return (
        <>
            <div className="container-title">
                <h2 className="text-title">Clientes</h2>
            </div>

            <div className="clientes-section">
                <div
                    className={`card card-clientes-dash ${animAgregar ? "card-click-anim" : ""}`}
                    onClick={() => triggerAnim("agregar")}
                    style={{ cursor: "pointer" }}
                >
                    <div className="card-body">
                        <h5 className="card-title">Agregar Cliente</h5>
                    </div>
                </div>

                <div
                    className={`card card-clientes-dash ${animCargar ? "card-click-anim" : ""}`}
                    onClick={() => triggerAnim("cargar")}
                    style={{ cursor: "pointer" }}
                >
                    <div className="card-body">
                        <h5 className="card-title">Cargar Todos los Clientes</h5>
                    </div>
                </div>
            </div>

            <div className="tabla-clientes">
                <h5 className="mb-3">Lista de Clientes</h5>
                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle">
                        <thead className="table-header-custom">
                            <tr>
                                <th>ID</th>
                                <th>Nombre del Cliente</th>
                                <th>Monto</th>
                                <th>Fecha de Contrato</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <th>{cliente.id}</th>
                                    <td>{cliente.nombre}</td>
                                    <td>${parseFloat(cliente.monto).toLocaleString()}</td>
                                    <td>{cliente.fecha}</td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            <button
                                                className="btn btn-sm"
                                                title="Ver"
                                                onClick={() => abrirModalVer(cliente)}
                                            >
                                                <img src={eyeIcon} alt="Ver" style={{ width: "18px", height: "18px" }} />
                                            </button>
                                            <button
                                                className="btn btn-sm"
                                                title="Editar"
                                                onClick={() => abrirModalEditar(cliente)}
                                            >
                                                <img src={editIcon} alt="Editar" style={{ width: "18px", height: "18px" }} />
                                            </button>
                                            <div className="switch-wrapper">
                                                <div className="form-check form-switch m-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        checked={cliente.activo}
                                                        onChange={() => toggleActivo(cliente.id)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modales definidos localmente */}
            <AgregarClienteModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                onAgregar={handleAgregarCliente}
            />

            <CargarClientesModal
                show={showCargarModal}
                handleClose={() => setShowCargarModal(false)}
            />

            {clienteSeleccionado && (
                <EditarClienteModal
                    show={showEditarModal}
                    handleClose={() => setShowEditarModal(false)}
                    clienteSeleccionado={clienteSeleccionado}
                    onGuardar={handleEditarCliente}
                />
            )}

            {clienteSeleccionado && (
                <VerClienteModal
                    show={showVerModal}
                    handleClose={() => setShowVerModal(false)}
                    clienteSeleccionado={clienteSeleccionado}
                />
            )}
        </>
    );
}