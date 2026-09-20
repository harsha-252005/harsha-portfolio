import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function ProjectCard({ project, index }) {
    const ref = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        setTilt({ x: y * -8, y: x * 8 });
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseMove={handleMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
            className="cyber-card group rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 flex flex-col items-center text-center relative overflow-hidden h-full bloom-neon"
        >
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-neon-primary/50 to-transparent" />

            <div className="mb-6 md:mb-8 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-primary group-hover:scale-110 group-hover:border-neon-primary transition-all duration-500 shadow-[0_0_20px_rgba(255, 0, 127, 0.1)]">
                <FaGithub size={24} md:size={28} />
            </div>

            <h3 className="font-heading text-xl md:text-2xl font-black uppercase mb-3 md:mb-4 tracking-tight text-white group-hover:text-neon-primary transition-colors">
                {project.title}
            </h3>

            <p className="text-text-dim text-sm md:text-base leading-relaxed mb-6 md:mb-8 flex-1 opacity-90 px-2 md:px-0">
                {project.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 md:mb-10">
                {project.tech.map(t => (
                    <span key={t} className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-cyber-bg border border-white/5 text-text-muted group-hover:text-white group-hover:border-neon-primary/30 transition-all font-mono">
                        {t}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-6 md:gap-10 border-t border-white/5 pt-8 md:pt-10 w-full justify-center">
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 md:gap-3 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-text-muted hover:text-neon-primary transition-colors group/link"
                >
                    <FaGithub size={16} md:size={18} className="group-hover/link:rotate-12" /> SOURCE
                </a>
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 md:gap-3 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-text-muted hover:text-neon-primary transition-colors group/link"
                >
                    <FaExternalLinkAlt size={14} md:size={16} className="group-hover/link:translate-x-1" /> LIVE
                </a>
            </div>
        </motion.div>
    );
}
