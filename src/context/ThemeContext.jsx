import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('portfolio-theme');
        return saved ? saved === 'dark' : true; // default dark
    });

    useEffect(() => {
        const body = document.body;
        body.classList.toggle('dark', isDark);
        body.classList.toggle('light', !isDark);
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
