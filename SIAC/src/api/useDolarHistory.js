import { useEffect, useState, useRef } from "react";

const API_KEY = "cur_live_3joBWoI5LKhz9SIeuUsBtPIwKM1HaiC2pI7Fkzwo";

export const useDolarHistory = () => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetched = useRef(false); // <- 🔒 evita llamadas duplicadas

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const obtenerDatos = async () => {
      const hoy = new Date();
      const fechas = [];

      for (let i = 5; i > 0; i--) {
        const d = new Date(hoy);
        d.setDate(hoy.getDate() - i);
        const iso = d.toISOString().split("T")[0];
        fechas.push(iso);
      }

      const resultados = [];

      for (const fecha of fechas) {
        const url = `https://api.currencyapi.com/v3/historical?apikey=${API_KEY}&currencies=MXN&base_currency=USD&date=${fecha}`;
        console.log("📡 Consultando:", url);

        try {
          const respuesta = await fetch(url);
          const data = await respuesta.json();

          if (data?.data?.MXN?.value) {
            const valor = data.data.MXN.value;
            console.log(`📅 Fecha: ${fecha} | 💵 Valor: ${valor}`);
            resultados.push({ fecha, valor });
          } else {
            console.warn(`⚠️ Sin datos válidos para la fecha: ${fecha}`);
          }
        } catch (err) {
          console.error(`❌ Error consultando ${fecha}:`, err);
          setError(true);
          break;
        }
      }

      setHistorial(resultados);
      setLoading(false);
    };

    obtenerDatos();
  }, []);

  return { history: historial, loading, error };
};