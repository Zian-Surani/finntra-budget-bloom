
import React, { useEffect, useState } from "react";
import { Info } from "lucide-react";

const HINTS = [
  "Did you know? Secure your finances by using unique passwords.",
  "Smart tip: Track spending daily for better savings.",
  "AI Assistant can help predict your monthly expenses.",
  "Try setting financial goals—FinnTra helps you hit them!",
  "Pro tip: Categorize expenses for sharper insights.",
  "Enable 2FA for extra account security anytime.",
  "You can analyze your spendings by month or category. Ask the AI on the next page!"
];

const getRandomHint = () =>
  HINTS[Math.floor(Math.random() * HINTS.length)];

const DynamicAiHint: React.FC = () => {
  const [hint, setHint] = useState(getRandomHint());

  useEffect(() => {
    // Change hint every ~6 seconds, animated in/out
    const interval = setInterval(() => {
      setHint(getRandomHint());
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-indigo-900/60 dark:to-blue-900/40 border border-indigo-200 dark:border-indigo-800 rounded-lg px-4 py-2 shadow animate-fade-in mt-2 mb-4 transition-all">
      <Info className="text-indigo-400 dark:text-indigo-400 shrink-0 mr-2" size={18} />
      <span className="text-sm text-gray-600 dark:text-indigo-100 font-medium animate-fade-in">{hint}</span>
    </div>
  );
};

export default DynamicAiHint;
