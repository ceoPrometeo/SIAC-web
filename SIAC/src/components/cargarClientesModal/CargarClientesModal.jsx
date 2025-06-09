import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import './CargarClientesModal.css';

export default function CargarClientesModal({ show, handleClose, onUpload }) {
  const [archivo, setArchivo] = useState(null);

  const handleArchivoChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!archivo) {
      Swal.fire({
        icon: "warning",
        title: "Archivo no seleccionado",
        text: "Por favor selecciona un archivo para cargar.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // Mostrar alerta inmediatamente al hacer clic en "Cargar"
    Swal.fire({
      icon: "success",
      title: "Clientes cargados",
      text: `El archivo "${archivo.name}" fue cargado correctamente.`,
      confirmButtonColor: "#28a745",
    });

    // Ejecutar acción de carga
    onUpload(archivo);
    
    // Limpiar y cerrar
    setArchivo(null);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cargar Lista de Clientes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Selecciona un archivo (CSV o Excel)</Form.Label>
            <Form.Control type="file" onChange={handleArchivoChange} />
            {archivo && <p className="archivo-nombre">Archivo: {archivo.name}</p>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Cargar</Button>
      </Modal.Footer>
    </Modal>
  );
}