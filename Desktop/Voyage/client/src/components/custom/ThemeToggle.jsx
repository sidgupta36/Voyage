import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        // If theme is system, we need to check what the system preference is to set the initial toggle state
        if (theme === 'system') {
            const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setIsChecked(systemIsDark);
        } else {
            setIsChecked(theme === 'dark');
        }
    }, [theme]);

    const handleToggle = (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        setTheme(newTheme);
        setIsChecked(e.target.checked);
    };

    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                id="checkboxInput"
                checked={isChecked}
                onChange={handleToggle}
            />
            <label htmlFor="checkboxInput" className="toggleSwitch"></label>
        </div>
    );
}
