// src/api/useDolarRate.js
import { useEffect, useState } from "react";

export default function useDolarRate() {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (data?.result === "success" && data.rates?.MXN) {
          setRate(data.rates.MXN);
        } else {
          throw new Error("Respuesta inválida");
        }
      })
      .catch((err) => {
        console.error("Error al obtener tipo de cambio:", err);
        setRate(null);
      });
  }, []);

  return rate;
}