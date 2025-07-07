import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';

export default function DonaChart() {
  const data = [
    { id: 0, value: 100, label: 'Agresivo', color: '#400080' },
    { id: 1, value: 10, label: 'Moderado', color: '#9933ff' },
    { id: 2, value: 15, label: 'Liquidity', color: '#bf80ff' },
  ];

  return (
       
    <PieChart
      series={[
        {
          data,
          innerRadius: 80,
          outerRadius: 120,
          paddingAngle: 2,
        },
      ]}
      width={400}
      height={300}
      legend={{ direction: 'row', position: { vertical: 'bottom', horizontal: 'middle' } }}
    />
    

  );
}