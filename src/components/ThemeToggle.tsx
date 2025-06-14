
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const THEME_KEY = "finntra-theme";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  function getInitialTheme() {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem(THEME_KEY) as "light" | "dark") || "light";
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 shadow-md border hover:scale-105 transition-transform duration-300 group"
    >
      <Sun
        className={`absolute transition-all duration-500 left-2.5 top-2.5 ${
          theme === "light"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-0"
        } text-yellow-400`}
        size={20}
      />
      <Moon
        className={`absolute transition-all duration-500 left-2.5 top-2.5 ${
          theme === "dark"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 rotate-90 scale-0"
        } text-indigo-400`}
        size={20}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
