import { useEffect, useState } from 'react';

export default function MouseGlow() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return (
        <div
            className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
            style={{
                background: `radial-gradient(1000px circle at ${position.x}px ${position.y}px, rgba(255, 0, 127, 0.1), transparent 80%)`,
            }}
        />
    );
}
