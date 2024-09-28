import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const profitData = [
  { name: 'Jan', profit: 1000 },
  { name: 'Feb', profit: 1500 },
  { name: 'Mar', profit: 1200 },
  { name: 'Apr', profit: 1800 },
  { name: 'May', profit: 2000 },
];

const ProfitChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={profitData}>
        <XAxis dataKey="name" stroke="#888888" />
        <YAxis stroke="#888888" />
        <Tooltip />
        <Line type="monotone" dataKey="profit" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProfitChart;