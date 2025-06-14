
import React from "react";

const MessageLoading = () => {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-indigo-200 dark:border-indigo-800 rounded-full"></div>
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <p className="text-indigo-600 dark:text-indigo-400 font-medium">Loading...</p>
      </div>
    </div>
  );
};

const MessageLoadingDemo = () => {
  return (
    <div className="block">
      <MessageLoading />
    </div>
  );
};

export { MessageLoading, MessageLoadingDemo };
