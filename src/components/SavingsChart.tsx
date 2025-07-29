import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SavingsChartProps {
  data: {
    newTotalRepayment: number;
    currentTotalRepayment: number;
    totalRepaymentSavings: number;
    newMonthlyPayment: number;
    currentMonthlyPayment: number;
    totalMonthlySavings: number;
  };
}

const SavingsChart: React.FC<SavingsChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: ['Current', 'Consolidated'],
    datasets: [
      {
        label: 'Total Repayment',
        data: [0, 0],
        backgroundColor: '#9ca3af',
      },
      {
        label: 'Monthly Payment',
        data: [0, 0],
        backgroundColor: '#06a9db',
      },
    ],
  });

  useEffect(() => {
    setChartData(prev => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
          data: [data.currentTotalRepayment, data.newTotalRepayment]
        },
        {
          ...prev.datasets[1],
          data: [data.currentMonthlyPayment, data.newMonthlyPayment]
        }
      ]
    }));
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `$${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (value: any) => `$${value.toLocaleString()}`
        }
      }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default SavingsChart;