
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
      className="flex items-center w-16 h-8 px-1 rounded-full bg-transparent border-2 border-indigo-400 dark:border-indigo-700 shadow-inner transition-all duration-300 relative focus:outline-none overflow-hidden group"
      tabIndex={0}
      style={{
        background: "transparent",
      }}
    >
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
        className={`absolute top-1 left-1 w-6 h-6 bg-white/70 dark:bg-gray-900/80 rounded-full shadow-md border border-indigo-200 dark:border-indigo-800 transition-all duration-500 ease-out z-20 ${
          theme === "dark" ? "translate-x-8" : ""
        }`}
        style={{
          willChange: "transform",
          background: "rgba(50,50,50,0.2)",
          backdropFilter: "blur(2px)",
        }}
      />
    </button>
  );
};
