
import { useState } from 'react';
import Header from '../components/Header';
import FileUpload from '../components/FileUpload';
import SummaryCards from '../components/SummaryCards';
import FraudGauge from '../components/FraudGauge';
import TransactionTable from '../components/TransactionTable';
import FraudChart from '../components/FraudChart';
import PredictionForm from '../components/PredictionForm';

const Index = () => {
  const [summaryData, setSummaryData] = useState({
    totalTransactions: 15842,
    totalFrauds: 342,
    avgFraudProbability: 0.23
  });

  const [currentFraudProbability, setCurrentFraudProbability] = useState(0.75);

  const [riskiestTransactions] = useState([
    {
      id: 1,
      amount: 12500.50,
      probability: 0.89,
      type: 'TRANSFER'
    },
    {
      id: 2,
      amount: 8900.25,
      probability: 0.85,
      type: 'CASH_OUT'
    },
    {
      id: 3,
      amount: 15600.00,
      probability: 0.82,
      type: 'PAYMENT'
    },
    {
      id: 4,
      amount: 7800.75,
      probability: 0.78,
      type: 'TRANSFER'
    },
    {
      id: 5,
      amount: 9200.30,
      probability: 0.76,
      type: 'CASH_OUT'
    }
  ]);

  const [fraudChartData] = useState([
    {
      type: 'TRANSFER',
      count: 145
    },
    {
      type: 'CASH_OUT',
      count: 89
    },
    {
      type: 'PAYMENT',
      count: 67
    },
    {
      type: 'DEBIT',
      count: 28
    },
    {
      type: 'CASH_IN',
      count: 13
    }
  ]);

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    // Simulate processing and update data
    setSummaryData({
      totalTransactions: Math.floor(Math.random() * 20000) + 10000,
      totalFrauds: Math.floor(Math.random() * 500) + 200,
      avgFraudProbability: Math.random() * 0.5 + 0.1
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header />
      
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Upload Section */}
        <div className="mb-8">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>

        {/* Summary Cards */}
        <div className="mb-8">
          <SummaryCards data={summaryData} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Fraud Gauge */}
          <div className="lg:col-span-1">
            <FraudGauge probability={currentFraudProbability} />
          </div>

          {/* Transaction Table */}
          <div className="lg:col-span-2">
            <TransactionTable transactions={riskiestTransactions} />
          </div>
        </div>

        {/* Chart and Prediction Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fraud Chart */}
          <div>
            <FraudChart data={fraudChartData} />
          </div>

          {/* Prediction Form */}
          <div>
            <PredictionForm onPredictionUpdate={setCurrentFraudProbability} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
