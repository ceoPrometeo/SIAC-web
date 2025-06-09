// src/pages/Renovados.jsx
import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Renovados.css";
import eyeIcon from "../../assets/eye.png";
import editIcon from "../../assets/edit.png";
import checkIcon from "../../assets/check.png";

export default function Renovados() {
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: "Marco Simone",
      monto: 5816.48,
      fecha: "2024-01-08",
      activo: true,
    },
    {
      id: 2,
      nombre: "Blanca Gutiérrez",
      monto: 25054.16,
      fecha: "2024-01-10",
      activo: true,
    },
    {
      id: 3,
      nombre: "David Ramírez",
      monto: 4900,
      fecha: "2024-03-05",
      activo: true,
    },
  ]);

  const toggleActivo = (id) => {
    const actualizados = clientes.map((c) =>
      c.id === id ? { ...c, activo: !c.activo } : c
    );
    setClientes(actualizados);
  };

  return (
    <>
      <div className="container-title">
        <h2 className="text-title">Clientes Renovados</h2>
      </div>

      <div className="tabla-clientes">
        <h5 className="mb-3">Listado de Renovados</h5>
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead className="table-header-custom">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Monto</th>
                <th>Fecha Renovación</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>${cliente.monto.toLocaleString()}</td>
                  <td>{cliente.fecha}</td>
                  <td>
                   <div className="img-table">
                     <img
                      src={checkIcon}
                      alt="Renovado"
                      title="Renovado"
                      className="estado-renovado-icon-table"
                    />
                   </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm" title="Ver">
                        <img
                          src={eyeIcon}
                          alt="Ver"
                          style={{ width: "18px" }}
                        />
                      </button>
                      <button className="btn btn-sm" title="Editar">
                        <img
                          src={editIcon}
                          alt="Editar"
                          style={{ width: "18px" }}
                        />
                      </button>
                      <div className="form-check form-switch m-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={cliente.activo}
                          onChange={() => toggleActivo(cliente.id)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      </div>
    </>
  );
}
