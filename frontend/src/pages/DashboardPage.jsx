import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import client from '../api/client';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    client.get('/students').then((res) => setStudents(res.data)).catch(() => {});
  }, []);

  const summary = {
    low: students.filter((s) => s.latestRiskCategory === 'Low Risk').length,
    medium: students.filter((s) => s.latestRiskCategory === 'Medium Risk').length,
    high: students.filter((s) => s.latestRiskCategory === 'High Risk').length
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Risk Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Low Risk" value={summary.low} color="bg-green-600" />
        <Card title="Medium Risk" value={summary.medium} color="bg-yellow-500" />
        <Card title="High Risk Alerts" value={summary.high} color="bg-red-600" />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <Bar
          data={{
            labels: ['Low', 'Medium', 'High'],
            datasets: [{ label: 'Students by Risk', data: [summary.low, summary.medium, summary.high], backgroundColor: ['#16a34a', '#f59e0b', '#dc2626'] }]
          }}
        />
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`${color} text-white p-4 rounded shadow`}>
    <p className="text-sm">{title}</p>
    <p className="text-3xl font-semibold">{value}</p>
  </div>
);

export default DashboardPage;
