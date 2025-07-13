import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../clientes/Clientes.css";
import eyeIcon from "../../assets/eye.png";
import editIcon from "../../assets/edit.png";
import { Modal, Button, Form } from "react-bootstrap";
import { obtenerClientes, registrarCliente } from "../../api/conexionesApi";

function VerClienteModal({ show, handleClose, cliente }) {
  if (!cliente) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {cliente.id}</p>
        <p><strong>Nombre:</strong> {cliente.nombre}</p>
        <p><strong>Correo:</strong> {cliente.correo}</p>
        <p><strong>Teléfono:</strong> {cliente.telefono}</p>
        <p><strong>Estado:</strong> {cliente.estado ? "Activo" : "Inactivo"}</p>
        <p><strong>Cartera Monto:</strong> ${cliente.carteraMonto?.toLocaleString()}</p>

        <hr />
        <h6>Contratos</h6>
        {cliente.contratos?.length > 0 ? (
          cliente.contratos.map((c, idx) => (
            <div key={idx} className="mb-2 p-2 border rounded">
              <p><strong>Cuenta MT5:</strong> {c.cuentaMT5}</p>
              <p><strong>Monto:</strong> ${c.monto?.toLocaleString()}</p>
              <p><strong>Fecha Inicio:</strong> {c.fechaInicio}</p>
              <p><strong>Fecha Renovación:</strong> {c.fechaRenovacion}</p>
              <p><strong>Estatus Renovación:</strong> {c.estatusRenovacion ? "Sí" : "No"}</p>
              <p><strong>Tipo Contrato:</strong> {c.tipoContrato}</p>
              <p><strong>Asesor:</strong> {c.usuario?.nombre || c.usuario?.correo || "No asignado"}</p>
            </div>
          ))
        ) : (
          <p>No hay contratos registrados.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

function EditarClienteModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Pendiente de implementar</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

function AgregarClienteModal({ show, handleClose, onAgregar }) {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    cuentaMT5: "",
    monto: "",
    fecha_inicio: "",
    estatus_renovacion: true,
    tipo_de_Contrato: "STANDARD",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fechaInicio = new Date(formData.fecha_inicio);
    const fechaRenovacion = new Date(fechaInicio);
    fechaRenovacion.setFullYear(fechaRenovacion.getFullYear() + 1);

    const nuevoConDatos = {
      ...formData,
      fecha_renovacion: fechaRenovacion.toISOString().split("T")[0],
    };

    onAgregar(nuevoConDatos);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group><Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </Form.Group>
          <Form.Group><Form.Label>Correo</Form.Label>
            <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} required />
          </Form.Group>
          <Form.Group><Form.Label>Teléfono</Form.Label>
            <Form.Control type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
          </Form.Group>
          <hr />
          <Form.Group><Form.Label>Cuenta MT5</Form.Label>
            <Form.Control type="text" name="cuentaMT5" value={formData.cuentaMT5} onChange={handleChange} required />
          </Form.Group>
          <Form.Group><Form.Label>Monto</Form.Label>
            <Form.Control type="number" name="monto" value={formData.monto} onChange={handleChange} required />
          </Form.Group>
          <Form.Group><Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control type="date" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} required />
          </Form.Group>
          <Form.Group><Form.Label>Tipo de Contrato</Form.Label>
            <Form.Select name="tipo_de_Contrato" value={formData.tipo_de_Contrato} onChange={handleChange}>
              <option value="STANDARD">STANDARD</option>
              <option value="PREMIUM">PREMIUM</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Check type="switch" label="Estatus Renovación" name="estatus_renovacion" checked={formData.estatus_renovacion} onChange={handleChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" type="submit">Registrar Cliente</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function CargarClientesModal({ show, handleClose }) {
  const [archivo, setArchivo] = useState(null);

  const handleFileChange = (e) => setArchivo(e.target.files[0]);

  const handleUpload = async () => {
    if (!archivo) {
      Swal.fire("Atención", "Selecciona un archivo CSV", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("file", archivo);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/cliente/cliente/cargar-archivo", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al subir archivo");

      Swal.fire("Éxito", `Clientes procesados: ${data.data.registrados}`, "success");
      handleClose();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cargar Clientes desde CSV</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleUpload}>Subir</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCargarModal, setShowCargarModal] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [showVerModal, setShowVerModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const lista = await obtenerClientes();
        setClientes(lista);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    };
    fetchClientes();
  }, []);

  const handleAgregarCliente = async (nuevo) => {
    const clienteDto = {
      nombre: nuevo.nombre,
      correo: nuevo.correo,
      telefono: nuevo.telefono,
      estado: true,
      contratos: [{
        cuentaMT5: nuevo.cuentaMT5,
        monto: parseFloat(nuevo.monto),
        fecha_inicio: nuevo.fecha_inicio,
        fecha_renovacion: nuevo.fecha_renovacion,
        estatus_renovacion: nuevo.estatus_renovacion,
        tipo_de_Contrato: nuevo.tipo_de_Contrato,
      }]
    };

    try {
      const clienteRegistrado = await registrarCliente(clienteDto);
      setClientes(prev => [...prev, clienteRegistrado]);
      setShowModal(false);
      Swal.fire("Éxito", "Cliente registrado correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <>
      <div className="container-title">
        <h2 className="text-title">Clientes</h2>
      </div>

      <div className="clientes-section">
        <div className="card card-clientes-dash" onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
          <div className="card-body">
            <h5 className="card-title">Agregar Cliente</h5>
          </div>
        </div>

        <div className="card card-clientes-dash" onClick={() => setShowCargarModal(true)} style={{ cursor: "pointer" }}>
          <div className="card-body">
            <h5 className="card-title">Cargar Clientes desde CSV</h5>
          </div>
        </div>
      </div>

      <div className="tabla-clientes">
        <h5 className="mb-3">Lista de Clientes</h5>
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cartera Monto</th>
                <th>Contratos</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>${cliente.carteraMonto?.toLocaleString()}</td>
                  <td>{cliente.contratos?.length || 0}</td>
                  <td>{cliente.estado ? "Activo" : "Inactivo"}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <img src={eyeIcon} alt="Ver" style={{ width: 18, cursor: "pointer" }} onClick={() => { setClienteSeleccionado(cliente); setShowVerModal(true); }} />
                      <img src={editIcon} alt="Editar" style={{ width: 18, cursor: "pointer" }} onClick={() => { setClienteSeleccionado(cliente); setShowEditarModal(true); }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AgregarClienteModal show={showModal} handleClose={() => setShowModal(false)} onAgregar={handleAgregarCliente} />
      <CargarClientesModal show={showCargarModal} handleClose={() => setShowCargarModal(false)} />
      <VerClienteModal show={showVerModal} handleClose={() => setShowVerModal(false)} cliente={clienteSeleccionado} />
      <EditarClienteModal show={showEditarModal} handleClose={() => setShowEditarModal(false)} />
    </>
  );
}
