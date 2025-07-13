import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "bulma/css/bulma.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Vencidos.css";
import warningRedIcon from "../../assets/warning-red.png";
import checkIcon from "../../assets/check.png";

const BASE_URL = "http://localhost:8080/api/cliente/contratos";

export default function Vencidos() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchClientesPorEstatus("VENCIDOS");
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
          renovado: c.estatusRenovacion === "RENOVADOS",
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

  const manejarRenovacion = async (id) => {
    Swal.fire({
      title: `¿Estás seguro de renovar este contrato?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6A5ACD",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, renovar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `${BASE_URL}/${id}/cambiar-estatus?nuevoEstatus=RENOVADOS`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.ok) {
            setClientes((prev) =>
              prev.map((c) => (c.id === id ? { ...c, renovado: true } : c))
            );
            Swal.fire("¡Felicidades!", "El contrato fue renovado.", "success");
          } else {
            Swal.fire("Error", "No se pudo cambiar el estado", "error");
          }
        } catch (err) {
          Swal.fire("Error", "Hubo un error al cambiar el estado", "error");
        }
      }
    });
  };

  return (
    <>
      <div className="container-title">
        <h2 className="text-title">Clientes Vencidos</h2>
      </div>

      <div className="tabla-clientes">
        <h5 className="mb-3">Listado de Vencidos</h5>

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
                          src={cliente.renovado ? checkIcon : warningRedIcon}
                          alt={cliente.renovado ? "Renovado" : "Vencido"}
                          title={cliente.renovado ? "Renovado" : "Vencido"}
                          className="estado-renovado-icon-table"
                          onClick={() =>
                            !cliente.renovado && manejarRenovacion(cliente.id)
                          }
                          style={{ cursor: "pointer" }}
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
