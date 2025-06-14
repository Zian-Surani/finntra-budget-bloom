
import React from "react";
import { X, Info } from "lucide-react";

export interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  transaction: {
    id: string | number;
    amount: number;
    description: string;
    category?: string;
    date: string;
    balanceAfter: number;
  } | null;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ open, onClose, transaction }) => {
  if (!open || !transaction) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-[95vw] max-w-md p-6 relative animate-scale-in">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition-all"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={22} />
        </button>
        <div className="flex items-center mb-4">
          <Info className="text-indigo-600 dark:text-indigo-400 mr-2" />
          <p className="font-semibold text-lg">Transaction Details</p>
        </div>
        <div className="mb-2">
          <span className="text-sm text-muted-foreground">Description:</span>
          <span className="block font-medium">{transaction.description}</span>
        </div>
        <div className="mb-2 flex flex-wrap gap-1">
          <span className="text-sm text-muted-foreground">Date:</span>
          <span className="font-medium">{transaction.date}</span>
        </div>
        {transaction.category && (
          <div className="mb-2 flex flex-wrap gap-1">
            <span className="text-sm text-muted-foreground">Category:</span>
            <span className="font-medium">{transaction.category}</span>
          </div>
        )}
        <div className="mb-2">
          <span className="text-sm text-muted-foreground">Amount:</span>
          <span className={`block font-bold ${transaction.amount < 0 ? "text-red-600" : "text-green-600"}`}>
            {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Balance after:</span>
          <span className="block text-lg font-bold text-indigo-700 dark:text-indigo-300">
            ${transaction.balanceAfter.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
