
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-center p-8">
      <div className="mb-8">
        <img
          src="/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png"
          alt="404 illustration"
          className="w-40 h-40 mx-auto animate-fade-in"
        />
      </div>
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-yellow-400 dark:to-pink-500 animate-fade-in">404</h1>
      <p className="text-2xl text-gray-700 dark:text-gray-200 mt-4 font-semibold animate-fade-in">Oops! Page Not Found</p>
      <p className="mt-2 text-gray-500 dark:text-gray-400 mb-6 animate-fade-in">
        The page you’re looking for doesn’t exist or was moved.<br/>Try using the menu, or <a href="/" className="text-blue-600 hover:underline font-medium">return home</a>.
      </p>
      <a href="/" className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-bold shadow hover:bg-indigo-600 transition-colors">Go Home</a>
    </div>
  );
};
export default NotFound;
