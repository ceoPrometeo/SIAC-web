import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Renovados.css";
import checkIcon from "../../assets/check.png"; // ✅ Solo este ícono sigue en uso

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
