
import { Circle } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-black/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-2 rounded-xl shadow-lg shadow-cyan-400/50">
              <Circle className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">FraudSight</h1>
              <p className="text-sm text-gray-400">Advanced Fraud Detection Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-white">Real-time Monitoring</p>
              <p className="text-xs text-green-400">● Active</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
