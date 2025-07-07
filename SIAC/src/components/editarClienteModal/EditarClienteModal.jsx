import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import './EditarClienteModal.css';

export default function EditarClienteModal({ show, handleClose, clienteSeleccionado, onGuardar }) {
  if (!clienteSeleccionado) return null;

  const [datosEditados, setDatosEditados] = useState({
    ...clienteSeleccionado,
    cuentas: clienteSeleccionado.cuentas?.length > 0
      ? clienteSeleccionado.cuentas
      : [{ cuenta: "", monto: "", fecha: "" }]
  });

  useEffect(() => {
    setDatosEditados({
      ...clienteSeleccionado,
      cuentas: clienteSeleccionado.cuentas?.length > 0
        ? clienteSeleccionado.cuentas
        : [{ cuenta: "", monto: "", fecha: "" }]
    });
  }, [clienteSeleccionado]);

  const handleChange = (e) => {
    setDatosEditados({ ...datosEditados, [e.target.name]: e.target.value });
  };

  const handleCuentaChange = (index, field, value) => {
    const nuevasCuentas = [...datosEditados.cuentas];
    nuevasCuentas[index][field] = value;
    setDatosEditados({ ...datosEditados, cuentas: nuevasCuentas });
  };

  const agregarCuenta = () => {
    if (datosEditados.cuentas.length < 6) {
      setDatosEditados({
        ...datosEditados,
        cuentas: [...datosEditados.cuentas, { cuenta: "", monto: "", fecha: "" }]
      });

      Swal.fire({
        icon: "success",
        title: "Cuenta agregada",
        text: "Se agregó una nueva cuenta MT5",
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  const eliminarCuenta = (index) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción eliminará la cuenta MT5",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevasCuentas = [...datosEditados.cuentas];
        nuevasCuentas.splice(index, 1);
        setDatosEditados({
          ...datosEditados,
          cuentas: nuevasCuentas.length > 0 ? nuevasCuentas : [{ cuenta: "", monto: "", fecha: "" }]
        });

        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "La cuenta ha sido eliminada.",
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  const handleGuardar = () => {
    Swal.fire({
      icon: "success",
      title: "Cambios guardados",
      text: "La información del cliente fue actualizada correctamente.",
      confirmButtonColor: "#3085d6"
    }).then(() => {
      onGuardar(datosEditados);
      handleClose();
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered dialogClassName="modal-editar-cliente">
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">{datosEditados.nombre}</h5>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={datosEditados.telefono || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={datosEditados.correo || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <hr />

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6>Cuentas MT5</h6>
          <Button size="sm" variant="success" onClick={agregarCuenta} disabled={datosEditados.cuentas.length >= 6}>
            Agregar Cuenta
          </Button>
        </div>

        {datosEditados.cuentas.map((cuenta, index) => (
          <Row key={index} className="align-items-end">
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Cuenta MT5 #{index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  value={cuenta.cuenta}
                  onChange={(e) => handleCuentaChange(index, "cuenta", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Monto</Form.Label>
                <Form.Control
                  type="number"
                  value={cuenta.monto}
                  onChange={(e) => handleCuentaChange(index, "monto", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  value={cuenta.fecha}
                  onChange={(e) => handleCuentaChange(index, "fecha", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button variant="danger" size="sm" onClick={() => eliminarCuenta(index)}>
                Eliminar
              </Button>
            </Col>
          </Row>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleGuardar}>Guardar Cambios</Button>
      </Modal.Footer>
    </Modal>
  );
}