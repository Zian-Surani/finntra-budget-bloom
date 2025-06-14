
import React from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const tutorialSteps = [
  {
    title: "Welcome to FinnTra!",
    description: "Manage and visualise your finances securely and efficiently.",
  },
  {
    title: "AI Powered Reports",
    description: "Get smart advice and playful spending insights any time.",
  },
  {
    title: "Track Every Expense",
    description: "Add, view, and categorize expenses with a tap in your dashboard.",
  },
  {
    title: "Your Data, Always Secure",
    description: "Your data is encrypted, private, and only visible to you.",
  },
];

const Tutorial: React.FC = () => {
  const [step, setStep] = React.useState(0);

  const next = () => {
    if (step < tutorialSteps.length - 1) setStep(step + 1);
    else window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center px-4">
      <ThemeToggle />
      <div className="max-w-lg w-full bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">{tutorialSteps[step].title}</h2>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-200">{tutorialSteps[step].description}</p>
        <Button className="w-full hover:scale-105" onClick={next}>
          {step === tutorialSteps.length - 1 ? "Go to Dashboard" : "Next"}
        </Button>
      </div>
      <div className="flex gap-2 mt-6">
        {tutorialSteps.map((_, i) => (
          <span key={i} className={`h-2 w-4 rounded-full block transition-all duration-200 ${i === step ? "bg-indigo-500" : "bg-gray-300 dark:bg-gray-700"}`} />
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
