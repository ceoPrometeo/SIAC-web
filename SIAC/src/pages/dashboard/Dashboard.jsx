import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Dashboard.css";
import check from "../../assets/check.png";
import warming from "../../assets/warning.png";
import warmingRed from "../../assets/warning-red.png";
import DonaChart from "../../components/DonaChart";
import DolarChart from "../../components/dolarChart/DolarChart";
import useDolarRate from "../../api/useDolarRate";


export default function Dashboard() {
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState("");

  const carteraClientes = 75000;
  const cantidadFlonate = parseFloat(cantidad) || 0;
  const cant = cantidadFlonate / 100;
  const ganancia = cant * carteraClientes;
  const resultado = ganancia / 0.7;
  const resta = resultado - ganancia;
  const totalGanancia = (resta / 3).toFixed(2);

  const dolarRate = useDolarRate();
  const montoEnPesos = dolarRate ? (carteraClientes * dolarRate).toFixed(2) : "Cargando...";

  return (
    <>
      <div className="container-title">
        <h2 className="text-title">Dashboard</h2>
      </div>
      <div className="container-ifo">
        <div className="cards">
         <div className="card-group">
  <div
    className="card card-clickable"
    onClick={() => navigate("/renovados")}
  >
    <div className="card-body-renovados">
      <h5 className="card-title">
        Renovados
        <img className="img-icons" src={check} alt="checking" />
      </h5>
      <p className="card-text">Clientes : 100</p>
    </div>
  </div>

  <div
    className="card card-clickable"
    onClick={() => navigate("/pendientes")}
  >
    <div className="card-body-pendientes">
      <h5 className="card-title">
        Pendientes
        <img className="img-icons" src={warming} alt="warning" />
      </h5>
      <p className="card-text">Clientes : 10</p>
    </div>
  </div>

  <div
    className="card card-clickable"
    onClick={() => navigate("/vencidos")}
  >
    <div className="card-body-vencidos">
      <h5 className="card-title">
        Vencidos
        <img className="img-icons" src={warmingRed} alt="warningRed" />
      </h5>
      <p className="card-text">Clientes : 1</p>
    </div>
  </div>
</div>
        </div>

        {/* Contenido principal dividido en izquierda y derecha */}
        <div className="details">
          {/* IZQUIERDA */}
          <div className="card-contratos">
            <div className="card-body">
              <h5 className="card-title-c">Tipo de contratos</h5>
              <div className="dona-chart-card">
                <div className="container-don">
                  <DonaChart />
                </div>
              </div>
            </div>

            {/* FORMULARIO ABAJO DE LA GRÁFICA */}
            <div className="card-formulario">
              <iframe
                src="https://forms.fillout.com/t/qw1RDZKJCNus"
                width="100%"
                height="260"
                frameBorder="0"
                title="Formulario Clientes"
                style={{ borderRadius: '10px' }}
              ></iframe>
            </div>
          </div>

          {/* DERECHA */}
          <div className="right-column">
            <div className="card card-cartera">
              <div className="card-body">
                <h5 className="card-title">Cartera de clientes</h5>
                <p className="card-text">Contenido de la cartera.</p>
                <div className="cartera-montos">
                  <a> Monto en USD es: {carteraClientes}</a>
                  <p>Monto en MXN: <strong>${montoEnPesos}</strong></p>
                </div>
              </div>
            </div>

          <div className="card card-extra">
  <div className="card-body card-body-flex">
    <div className="input-container">
      <h5 className="card-title" style={{ marginBottom: "5px" }}>Cálculo aproximado</h5>
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
        Comision por rendimientos: <strong>${totalGanancia}</strong>
      </p>
      <p className="card-text">
        Comision por renovacion: <strong>${2500}</strong>
      </p>
    </div>
  </div>
</div>

            <div className="card-divisa-full">
              Precio de dolar= <strong>${dolarRate ? dolarRate.toFixed(1) : "Cargando..."}</strong>
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