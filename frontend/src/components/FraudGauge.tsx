
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface FraudGaugeProps {
  probability: number;
}

const FraudGauge = ({ probability }: FraudGaugeProps) => {
  const percentage = Math.round(probability * 100);
  
  const getColor = (prob: number) => {
    if (prob < 0.3) return '#22d3ee'; // cyan-400
    if (prob < 0.6) return '#fb7185'; // rose-400
    return '#f87171'; // red-400
  };

  const getRiskLevel = (prob: number) => {
    if (prob < 0.3) return 'Low Risk';
    if (prob < 0.6) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-6 text-center">Fraud Probability</h3>
      
      <div className="flex flex-col items-center">
        <div className="w-48 h-48 mb-6">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: getColor(probability),
              textColor: getColor(probability),
              trailColor: '#374151',
              strokeLinecap: 'round',
            })}
          />
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold" style={{ color: getColor(probability) }}>
            {getRiskLevel(probability)}
          </p>
          <p className="text-gray-300 mt-1">Current Transaction Risk</p>
        </div>

        <div className="mt-6 w-full">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${percentage}%`, 
                backgroundColor: getColor(probability) 
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudGauge;
