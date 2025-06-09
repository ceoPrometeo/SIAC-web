import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../clientes/Clientes.css";
import eyeIcon from "../../assets/eye.png";
import editIcon from "../../assets/edit.png";
import AgregarClienteModal from "../../components/agregarClienteModal/AgregarClienteModal";
import CargarClientesModal from "../../components/cargarClientesModal/CargarClientesModal";
import EditarClienteModal from "../../components/editarClienteModal/EditarClienteModal";
import VerClienteModal from "../../components/verClienteModal/VerClienteModal";

export default function Clientes() {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Juan Pérez", monto: 12000, fecha: "2024-06-01", activo: true },
    { id: 2, nombre: "María López", monto: 8500, fecha: "2024-05-15", activo: true },
    { id: 3, nombre: "Carlos Ruiz", monto: 7300, fecha: "2024-04-20", activo: false },
    { id: 4, nombre: "Ana Martínez", monto: 10200, fecha: "2024-03-28", activo: true },
  ]);

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

  const handleAgregarCliente = (nuevo) => {
    setClientes([...clientes, { ...nuevo, id: clientes.length + 1, activo: true }]);
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