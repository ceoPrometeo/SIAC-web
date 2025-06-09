import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDolarHistory } from "../../api/useDolarHistory";
import "./DolarChart.css";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

const DolarChart = () => {
  const { history, loading, error } = useDolarHistory();

  if (loading) return <p className="estado-carga">Cargando datos...</p>;
  if (error || !history || !Array.isArray(history) || history.length === 0) {
    return <p className="estado-carga">Error al cargar los datos</p>;
  }

  const datosFiltrados = history
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .slice(-5);

  const fechas = datosFiltrados.map((item) => item.fecha);
  const valores = datosFiltrados.map((item) => item.valor);
  const valorActual = valores[valores.length - 1];

  const minY = Math.min(...valores);
  const maxY = Math.max(...valores);

  const chartData = {
    labels: fechas,
    datasets: [
      {
        label: "USD → MXN",
        data: valores,
        fill: true,
        borderColor: "blue",
        backgroundColor: "rgba(0, 123, 255, 0.1)",
        pointBackgroundColor: "white",
        pointBorderColor: "blue",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: Math.floor(minY * 10) / 10 - 0.05,
        max: Math.ceil(maxY * 10) / 10 + 0.05,
        ticks: {
          stepSize: 0.05,
          callback: (value) => "$" + value.toFixed(2),
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
      <div className="valor-actual">Actual: ${valorActual.toFixed(2)}</div>
    </div>
  );
};

export default DolarChart;