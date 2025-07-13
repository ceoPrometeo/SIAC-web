import React, { useState } from "react";
import Swal from "sweetalert2";
import "bulma/css/bulma.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Pendientes.css";
import warningIcon from "../../assets/warning.png";

export default function Pendientes() {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Luis Domínguez", monto: 961.97, fecha: "2024-06-01", activo: true },
    { id: 2, nombre: "Silvia Bravo", monto: 1100.0, fecha: "2024-06-15", activo: true },
  ]);

  const manejarRenovacion = (cliente) => {
    Swal.fire({
      title: "¿Estás seguro de renovar el contrato?",
      text: `Cliente: ${cliente.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6A5ACD",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, renovar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Felicidades!",
          text: "Tu cliente se ha renovado.",
          icon: "success",
          confirmButtonColor: "#6A5ACD",
        });
      }
    });
  };

  return (
    <>
      <div className="container-title">
        <h2 className="text-title">Clientes Pendientes</h2>
      </div>

      <div className="tabla-clientes">
        <h5 className="mb-3">Listado de Pendientes</h5>
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
                        src={warningIcon}
                        alt="Pendiente"
                        title="Pendiente"
                        className="estado-renovado-icon-table"
                        onClick={() => manejarRenovacion(cliente)}
                        style={{ cursor: "pointer" }}
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
