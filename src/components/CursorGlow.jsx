import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CursorGlow() {
    const [pos, setPos] = useState({ x: -300, y: -300 });
    const { isDark } = useTheme();

    useEffect(() => {
        const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handler);
        return () => window.removeEventListener('mousemove', handler);
    }, []);

    if (!isDark) return null;

    return <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} />;
}
