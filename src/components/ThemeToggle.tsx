
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
      className={`flex items-center w-16 h-8 px-1 rounded-full bg-gradient-to-r from-indigo-300/80 to-blue-400/80 dark:from-gray-800 dark:to-indigo-900 border-2 border-indigo-400 dark:border-indigo-700 shadow-inner transition-all duration-300 relative focus:outline-none overflow-hidden group`}
      tabIndex={0}
    >
      {/* Animated pill background */}
      <span
        className={`absolute left-0 top-0 h-full w-1/2 bg-indigo-100 dark:bg-gray-800 rounded-full z-0 transition-all duration-500
          ${theme === "dark" ? "translate-x-full bg-indigo-600" : ""}
        `}
        style={{
          boxShadow: theme === "dark"
            ? "0 8px 36px 8px #3730a3"
            : "0 5px 25px 5px #c7d2fe",
        }}
      />
      <span className="z-10 flex-1 flex justify-between items-center w-full">
        <Sun
          size={22}
          className={`transition-all duration-500 ${theme === "light" ? "text-yellow-400 scale-110" : "opacity-40 scale-90"}`}
        />
        <Moon
          size={22}
          className={`transition-all duration-500 ${theme === "dark" ? "text-indigo-300 scale-110" : "opacity-40 scale-90"}`}
        />
      </span>
      {/* Animated thumb */}
      <span
        className={`absolute top-1 left-1 w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md border border-indigo-200 dark:border-indigo-800 transition-all duration-500 ease-out z-20 ${
          theme === "dark" ? "translate-x-8" : ""
        }`}
        style={{ willChange: "transform" }}
      />
    </button>
  );
};
