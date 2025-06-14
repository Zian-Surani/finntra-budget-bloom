
import React, { useState } from "react";

interface FinancialAnalyticsProps {
  apiKey?: string;
  // Add other props as needed
}

const FinancialAnalytics: React.FC<FinancialAnalyticsProps> = ({ apiKey }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    // Placeholder: This should connect to a real financial service API!
    setTimeout(() => {
      setSummary("You spent $1,228 last month. Top category: Food & Groceries.");
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-indigo-900 dark:to-blue-950 rounded-xl p-4 mb-6 shadow-md">
      <h4 className="font-bold text-lg mb-2">Financial Analytics</h4>
      <p className="text-sm text-gray-600 dark:text-gray-200 mb-2">
        {apiKey ? "Analytics ready using your API key." : "Enter your API key to connect your financial data."}
      </p>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full font-semibold transition-all shadow ripple-btn"
        onClick={fetchAnalytics}
        disabled={loading}
        style={{cursor: loading ? "not-allowed" : "pointer"}}
      >
        {!loading ? "Fetch Analytics" : "Loading..."}
      </button>
      {summary && (
        <p className="mt-3 text-base text-indigo-800 dark:text-indigo-200 animate-fade-in">{summary}</p>
      )}
    </div>
  );
};

export default FinancialAnalytics;
