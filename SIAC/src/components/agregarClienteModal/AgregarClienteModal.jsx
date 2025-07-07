import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import './AgregarClienteModal.css';

export default function AgregarClienteModal({ show, handleClose, onAgregar }) {
  const [nuevoCliente, setNuevoCliente] = useState({
    cuenta: "",
    nombre: "",
    monto: "",
    correo: "",
    telefono: "",
    fecha: ""
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: false }); // elimina error al escribir
  };

  const handleSubmit = () => {
    const nuevosErrores = {};
    const { cuenta, nombre, monto, fecha } = nuevoCliente;

    if (!cuenta.trim()) nuevosErrores.cuenta = true;
    if (!nombre.trim()) nuevosErrores.nombre = true;
    if (!monto) nuevosErrores.monto = true;
    if (!fecha) nuevosErrores.fecha = true;

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      Swal.fire({
        icon: 'warning',
        title: 'Campos obligatorios',
        text: 'Por favor completa todos los campos requeridos.',
      });
      return;
    }

    onAgregar(nuevoCliente);
    Swal.fire({
      icon: 'success',
      title: 'Cliente agregado',
      text: 'El cliente se registró correctamente.',
      timer: 1800,
      showConfirmButton: false
    });

    setNuevoCliente({
      cuenta: "",
      nombre: "",
      monto: "",
      correo: "",
      telefono: "",
      fecha: ""
    });
    setErrores({});
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Cliente Nuevo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Cuenta MT5 *</Form.Label>
            <Form.Control
              type="text"
              name="cuenta"
              value={nuevoCliente.cuenta}
              onChange={handleChange}
              placeholder="Ingrese cuenta MT5"
              className={errores.cuenta ? "is-invalid" : ""}
            />
            {errores.cuenta && <div className="invalid-feedback">Campo obligatorio</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre Completo *</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={nuevoCliente.nombre}
              onChange={handleChange}
              placeholder="Ingrese nombre completo"
              className={errores.nombre ? "is-invalid" : ""}
            />
            {errores.nombre && <div className="invalid-feedback">Campo obligatorio</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Monto *</Form.Label>
            <Form.Control
              type="number"
              name="monto"
              value={nuevoCliente.monto}
              onChange={handleChange}
              placeholder="Ingrese monto"
              className={errores.monto ? "is-invalid" : ""}
            />
            {errores.monto && <div className="invalid-feedback">Campo obligatorio</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              name="correo"
              value={nuevoCliente.correo}
              onChange={handleChange}
              placeholder="Ingrese correo"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={nuevoCliente.telefono}
              onChange={handleChange}
              placeholder="Ingrese teléfono"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de Contrato *</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={nuevoCliente.fecha}
              onChange={handleChange}
              className={errores.fecha ? "is-invalid" : ""}
            />
            {errores.fecha && <div className="invalid-feedback">Campo obligatorio</div>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Agregar Cliente</Button>
      </Modal.Footer>
    </Modal>
  );
}