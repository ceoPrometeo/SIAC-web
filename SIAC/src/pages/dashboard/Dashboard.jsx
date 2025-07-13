import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Dashboard.css";
import check from "../../assets/check.png";
import warning from "../../assets/warning.png";
import warningRed from "../../assets/warning-red.png";
import DonaChart from "../../components/DonaChart";
import DolarChart from "../../components/dolarChart/DolarChart";
import useDolarRate from "../../api/useDolarRate";

export default function Dashboard() {
  const navigate = useNavigate();

  const [carteraClientes, setCarteraClientes] = useState(0);
  const [cantidad, setCantidad] = useState("");
  const [tiposContratos, setTiposContratos] = useState({
    AGRESIVO: 0,
    MODERADO: 0,
    CONSERVADOR: 0,
    LIQUIDITY: 0,
  });
  const [estatusContratos, setEstatusContratos] = useState({
    Renovados: 0,
    Pendientes: 0,
    Vencidos: 0,
  });

  const dolarRate = useDolarRate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchCartera = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/cliente/cartera/monto", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const match = data.message?.match(/(\d+(?:\.\d+)?)/);
        if (match) setCarteraClientes(parseFloat(match[1]));
      } catch {
        setCarteraClientes(0);
      }
    };

    const fetchTipos = async () => {
      const tipos = ["AGRESIVO", "MODERADO", "CONSERVADOR", "LIQUIDITY"];
      const resultados = {};
      for (const tipo of tipos) {
        try {
          const res = await fetch(
            `http://localhost:8080/api/cliente/contratos/tipoContrato?estatus=${tipo}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data = await res.json();
          const match = data.message?.match(/(\d+)/);
          resultados[tipo] = match ? parseInt(match[1], 10) : 0;
        } catch {
          resultados[tipo] = 0;
        }
      }
      setTiposContratos(resultados);
    };

    const fetchEstatus = async () => {
      const estatuses = ["Renovados", "Pendientes", "Vencidos"];
      const resultados = {};
      for (const estatus of estatuses) {
        try {
          const res = await fetch(
            `http://localhost:8080/api/cliente/contratos/estatus?estatus=${estatus}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data = await res.json();
          const match = data.message?.match(/(\d+)/);
          resultados[estatus] = match ? parseInt(match[1], 10) : 0;
        } catch {
          resultados[estatus] = 0;
        }
      }
      setEstatusContratos(resultados);
    };

    fetchCartera();
    fetchTipos();
    fetchEstatus();
  }, []);

  const cartera = carteraClientes;

  const cantidadFlonate = parseFloat(cantidad) || 0;
  const cant = cantidadFlonate / 100;
  const ganancia = cant * cartera;
  const resultado = ganancia / 0.7;
  const resta = resultado - ganancia;
  const totalGanancia = (resta / 3).toFixed(2);

  const montoEnPesos = dolarRate ? (cartera * dolarRate).toFixed(2) : "Cargando...";

  return (
    <>
      <div className="container-title">
        <h2 className="text-title">Dashboard</h2>
      </div>

      <div className="container-ifo">
        <div className="cards">
          <div className="card-group">
            <div className="card card-clickable" onClick={() => navigate("/renovados")}>
              <div className="card-body-renovados">
                <h5 className="card-title">
                  Renovados
                  <img className="img-icons" src={check} alt="checking" />
                </h5>
                <p className="card-text">Clientes : {estatusContratos.Renovados}</p>
              </div>
            </div>

            <div className="card card-clickable" onClick={() => navigate("/pendientes")}>
              <div className="card-body-pendientes">
                <h5 className="card-title">
                  Pendientes
                  <img className="img-icons" src={warning} alt="warning" />
                </h5>
                <p className="card-text">Clientes : {estatusContratos.Pendientes}</p>
              </div>
            </div>

            <div className="card card-clickable" onClick={() => navigate("/vencidos")}>
              <div className="card-body-vencidos">
                <h5 className="card-title">
                  Vencidos
                  <img className="img-icons" src={warningRed} alt="warningRed" />
                </h5>
                <p className="card-text">Clientes : {estatusContratos.Vencidos}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="details">
          <div className="card-contratos">
            <div className="card-body">
              <h5 className="card-title-c">Tipo de contratos</h5>
              <div className="dona-chart-card">
                <div className="container-don">
                  <DonaChart tiposContratos={tiposContratos} />
                </div>
              </div>
            </div>

            <div className="card-formulario">
              <iframe
                src="https://forms.fillout.com/t/qw1RDZKJCNus"
                width="100%"
                height="260"
                frameBorder="0"
                title="Formulario Clientes"
                style={{ borderRadius: "10px" }}
              ></iframe>
            </div>
          </div>

          <div className="right-column">
            <div className="card card-cartera">
              <div className="card-body">
                <h5 className="card-title">Cartera de clientes</h5>
                <div className="cartera-montos">
                  <p>
                    Monto en USD: <strong>${cartera.toLocaleString()}</strong>
                  </p>
                  <p>
                    Monto en MXN: <strong>${montoEnPesos}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="card card-extra">
              <div className="card-body card-body-flex">
                <div className="input-container">
                  <h5 className="card-title" style={{ marginBottom: "5px" }}>
                    Cálculo aproximado
                  </h5>
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Ingresa una cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                  />
                </div>

                <div className="commission-info">
                  <p className="card-text">
                    Comisión por rendimientos: <strong>${totalGanancia}</strong>
                  </p>
                  <p className="card-text">
                    Comisión por renovación: <strong>$2500</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="card-divisa-full">
              Precio del dólar:{" "}
              <strong>{dolarRate ? `$${dolarRate.toFixed(1)}` : "Cargando..."}</strong>
              <div className="card-body">
                <DolarChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
