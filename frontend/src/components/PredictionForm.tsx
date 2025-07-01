import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { predictSingleTransaction } from "../api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface PredictionFormProps {
  onPredictionUpdate: (probability: number) => void;
}

interface ContributingFactor {
  factor: string;
  impact: number;
}

const PredictionForm = ({ onPredictionUpdate }: PredictionFormProps) => {
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    oldBalanceOrigin: "",
    newBalanceOrigin: "",
    oldBalanceDestination: "",
    newBalanceDestination: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [contributingFactors, setContributingFactors] = useState<ContributingFactor[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const transactionData = {
        type: formData.type,
        amount: parseFloat(formData.amount),
        oldbalanceOrg: parseFloat(formData.oldBalanceOrigin),
        newbalanceOrig: parseFloat(formData.newBalanceOrigin),
        oldbalanceDest: parseFloat(formData.oldBalanceDestination),
        newbalanceDest: parseFloat(formData.newBalanceDestination),
      };

      const result = await predictSingleTransaction(transactionData);

      // ✅ Correct property: fraudProbability from backend response
      const fraudProbability = result.fraudProbability;
      setPrediction(fraudProbability);
      onPredictionUpdate(fraudProbability);

      // ✅ Set contributing factors
      if (result.explanations) {
        setContributingFactors(result.explanations);
      } else {
        setContributingFactors([]);
      }

    } catch (error) {
      console.error("Prediction failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getColor = (prob: number) => {
    if (prob < 0.3) return "#22d3ee";
    if (prob < 0.6) return "#fb7185";
    return "#f87171";
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-2xl shadow-lg p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-6">Single Transaction Prediction</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="type" className="text-gray-300">Transaction Type</Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
            <SelectTrigger className="mt-1 bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              {["PAYMENT", "TRANSFER", "CASH_OUT", "DEBIT", "CASH_IN"].map((type) => (
                <SelectItem key={type} value={type} className="text-white">{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="amount" className="text-gray-300">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(e) => handleInputChange("amount", e.target.value)}
            placeholder="0.00"
            className="mt-1 bg-gray-800 border-gray-600 text-white"
          />
        </div>

        {[
          { id: "oldBalanceOrigin", label: "Old Balance Origin" },
          { id: "newBalanceOrigin", label: "New Balance Origin" },
          { id: "oldBalanceDestination", label: "Old Balance Destination" },
          { id: "newBalanceDestination", label: "New Balance Destination" },
        ].map((field) => (
          <div key={field.id}>
            <Label htmlFor={field.id} className="text-gray-300">{field.label}</Label>
            <Input
              id={field.id}
              type="number"
              value={formData[field.id as keyof typeof formData]}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              placeholder="0.00"
              className="mt-1 bg-gray-800 border-gray-600 text-white"
            />
          </div>
        ))}

        <Button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Analyzing..." : "Predict Fraud"}
        </Button>
      </form>

      {prediction !== null && (
        <div className="mt-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24">
              <CircularProgressbar
                value={prediction * 100}
                text={`${Math.round(prediction * 100)}%`}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: getColor(prediction),
                  textColor: getColor(prediction),
                  trailColor: "#374151",
                  strokeLinecap: "round",
                })}
              />
            </div>
          </div>

          {contributingFactors.length > 0 && (
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h4 className="font-semibold text-white mb-3">Top Contributing Factors</h4>
              {contributingFactors.map((factor, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">{factor.feature}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${factor.impact * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-white">{(factor.impact * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
