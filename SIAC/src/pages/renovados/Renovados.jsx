import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Renovados.css";
import checkIcon from "../../assets/check.png";

const BASE_URL = "http://localhost:8080/api/cliente/contratos";

export default function Renovados() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchClientesPorEstatus("RENOVADOS");
  }, []);

  const fetchClientesPorEstatus = async (estatus) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/estatus?estatus=${estatus.toUpperCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (!data.error) {
        const mapped = data.data.map((c) => ({
          id: c.contratoId,
          nombre: c.clienteNombre,
          monto: c.monto,
          fecha: c.fechaRenovacion,
        }));
        setClientes(mapped);
      } else {
        Swal.fire("Error", "No se pudieron obtener los clientes", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Hubo un error en la solicitud", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-title">
        <h2 className="text-title">Clientes Renovados</h2>
      </div>

      <div className="tabla-clientes">
        <h5 className="mb-3">Listado de Renovados</h5>

        {loading ? (
          <p>Cargando...</p>
        ) : (
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
        )}
      </div>
    </>
  );
}
