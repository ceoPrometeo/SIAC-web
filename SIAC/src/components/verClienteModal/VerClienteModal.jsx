import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "./VerClienteModal.css";

export default function VerClienteModal({ show, handleClose, clienteSeleccionado }) {
  if (!clienteSeleccionado) return null;

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered dialogClassName="modal-editar-cliente">
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">{clienteSeleccionado.nombre}</h5>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" value={clienteSeleccionado.telefono || ""} disabled />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" value={clienteSeleccionado.correo || ""} disabled />
            </Form.Group>
          </Col>
        </Row>

        <hr />

        {clienteSeleccionado.cuentas?.map((cuenta, index) => (
          <Row key={index}>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Cuenta MT5 #{index + 1}</Form.Label>
                <Form.Control type="text" value={cuenta.cuenta} disabled />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Monto</Form.Label>
                <Form.Control type="number" value={cuenta.monto} disabled />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control type="date" value={cuenta.fecha} disabled />
              </Form.Group>
            </Col>
          </Row>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}