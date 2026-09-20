import { useState, useEffect } from 'react';

export default function VisitorCounter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const key = 'portfolio-visitor-count';
        const visited = sessionStorage.getItem('portfolio-visited');
        let current = parseInt(localStorage.getItem(key) || '0', 10);
        if (!visited) {
            current += 1;
            localStorage.setItem(key, current.toString());
            sessionStorage.setItem('portfolio-visited', 'true');
        }
        setCount(current);
    }, []);

    return (
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-pill border-neon-cyan/10">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_8px_#00f3ff]" />
            <span className="text-[10px] font-black tracking-widest uppercase text-text-dim">
                Network Entry Counter: <span className="text-neon-cyan">{count}</span>
            </span>
        </div>
    );
}
