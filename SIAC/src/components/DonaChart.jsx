import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';

export default function DonaChart({ tiposContratos }) {
  const data = [
    { id: 0, value: tiposContratos.AGRESIVO || 0, label: 'Agresivo', color: '#400080' },
    { id: 1, value: tiposContratos.MODERADO || 0, label: 'Moderado', color: '#9933ff' },
    { id: 2, value: tiposContratos.CONSERVADOR || 0, label: 'Conservador', color: '#bf80ff' },
    { id: 3, value: tiposContratos.LIQUIDITY || 0, label: 'Liquidity', color: '#6600cc' },
  ];

  return (
    <PieChart
      series={[{
        data,
        innerRadius: 80,
        outerRadius: 120,
        paddingAngle: 2,
      }]}
      width={400}
      height={300}
      legend={{ direction: 'row', position: { vertical: 'bottom', horizontal: 'middle' } }}
    />
  );
}
