
interface Transaction {
  id: number;
  amount: number;
  probability: number;
  type: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (prob: number): string => {
    return `${(prob * 100).toFixed(1)}%`;
  };

  const getRiskColor = (prob: number): string => {
    if (prob < 0.3) return 'text-cyan-400 bg-cyan-400/20 border-cyan-400/30';
    if (prob < 0.6) return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
    return 'text-red-400 bg-red-400/20 border-red-400/30';
  };

  const getTypeColor = (type: string): string => {
    const colors = {
      'TRANSFER': 'bg-blue-400/20 text-blue-400 border-blue-400/30',
      'CASH_OUT': 'bg-purple-400/20 text-purple-400 border-purple-400/30',
      'PAYMENT': 'bg-green-400/20 text-green-400 border-green-400/30',
      'DEBIT': 'bg-orange-400/20 text-orange-400 border-orange-400/30',
      'CASH_IN': 'bg-indigo-400/20 text-indigo-400 border-indigo-400/30',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-400/20 text-gray-400 border-gray-400/30';
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white">Top 5 Riskiest Transactions</h3>
        <p className="text-gray-300 mt-1">Transactions with highest fraud probability</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Fraud Probability
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} className="hover:bg-gray-800/30 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/50">
                      <span className="text-black text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-white">#{transaction.id.toString().padStart(6, '0')}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-white">{formatCurrency(transaction.amount)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getTypeColor(transaction.type)}`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getRiskColor(transaction.probability)}`}>
                      {formatPercentage(transaction.probability)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
