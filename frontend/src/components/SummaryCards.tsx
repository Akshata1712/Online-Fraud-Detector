
interface SummaryData {
  totalTransactions: number;
  totalFrauds: number;
  avgFraudProbability: number;
}

interface SummaryCardsProps {
  data: SummaryData;
}

const SummaryCards = ({ data }: SummaryCardsProps) => {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  const formatPercentage = (num: number): string => {
    return `${(num * 100).toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Transactions */}
      <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-300 uppercase tracking-wide">Total Transactions</p>
            <p className="text-3xl font-bold text-white mt-2">{formatNumber(data.totalTransactions)}</p>
          </div>
          <div className="bg-cyan-400/20 p-3 rounded-xl border border-cyan-400/30">
            <div className="w-6 h-6 bg-cyan-400 rounded shadow-lg shadow-cyan-400/50"></div>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span className="text-green-400 text-sm font-medium">+12.5%</span>
          <span className="text-gray-400 text-sm ml-2">from last month</span>
        </div>
      </div>

      {/* Total Frauds */}
      <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-300 uppercase tracking-wide">Frauds Detected</p>
            <p className="text-3xl font-bold text-red-400 mt-2">{formatNumber(data.totalFrauds)}</p>
          </div>
          <div className="bg-red-400/20 p-3 rounded-xl border border-red-400/30">
            <div className="w-6 h-6 bg-red-400 rounded shadow-lg shadow-red-400/50"></div>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span className="text-red-400 text-sm font-medium">+8.2%</span>
          <span className="text-gray-400 text-sm ml-2">from last month</span>
        </div>
      </div>

      {/* Average Fraud Probability */}
      <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-300 uppercase tracking-wide">Avg Fraud Probability</p>
            <p className="text-3xl font-bold text-orange-400 mt-2">{formatPercentage(data.avgFraudProbability)}</p>
          </div>
          <div className="bg-orange-400/20 p-3 rounded-xl border border-orange-400/30">
            <div className="w-6 h-6 bg-orange-400 rounded shadow-lg shadow-orange-400/50"></div>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span className="text-green-400 text-sm font-medium">-3.1%</span>
          <span className="text-gray-400 text-sm ml-2">from last month</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
