
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "finntra-theme";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () =>
      (typeof window !== "undefined" &&
        (localStorage.getItem(THEME_KEY) as "light" | "dark")) ||
      "light"
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="flex items-center w-16 h-8 px-1 rounded-full bg-white/20 dark:bg-gray-800/30 border-2 border-indigo-300/50 dark:border-indigo-600/50 shadow-inner transition-all duration-300 relative focus:outline-none overflow-hidden group backdrop-blur-sm"
      tabIndex={0}
    >
      <span className="z-10 flex-1 flex justify-between items-center w-full">
        <Sun
          size={22}
          className={`transition-all duration-500 ${theme === "light" ? "text-yellow-500 scale-110 drop-shadow-lg" : "text-gray-400 opacity-50 scale-90"}`}
        />
        <Moon
          size={22}
          className={`transition-all duration-500 ${theme === "dark" ? "text-blue-300 scale-110 drop-shadow-lg" : "text-gray-400 opacity-50 scale-90"}`}
        />
      </span>
      {/* Animated thumb */}
      <span
        className={`absolute top-1 left-1 w-6 h-6 bg-white/80 dark:bg-gray-700/80 rounded-full shadow-md border border-indigo-200/50 dark:border-indigo-700/50 transition-all duration-500 ease-out z-20 backdrop-blur-sm ${
          theme === "dark" ? "translate-x-8" : ""
        }`}
        style={{
          willChange: "transform",
          boxShadow: theme === "light" 
            ? "0 2px 8px rgba(255, 193, 7, 0.3)" 
            : "0 2px 8px rgba(59, 130, 246, 0.3)",
        }}
      />
    </button>
  );
};
