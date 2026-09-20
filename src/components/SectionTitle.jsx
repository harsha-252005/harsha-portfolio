import { motion } from 'framer-motion';

export default function SectionTitle({ label, title, subtitle }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 md:mb-16 flex flex-col items-center w-full"
        >
            {label && (
                <p className="text-[11px] tracking-[0.6em] font-black uppercase text-neon-primary mb-4 drop-shadow-[0_0_12px_rgba(255, 0, 127, 0.5)]">
                    {label}
                </p>
            )}
            <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 text-white">
                {title}
            </h2>
            {subtitle && (
                <p className="text-text-dim max-w-2xl mx-auto text-sm md:text-lg font-medium leading-relaxed tracking-wide px-6 opacity-90">
                    {subtitle}
                </p>
            )}
            <div className="mt-8 flex justify-center items-center gap-4">
                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-neon-primary opacity-50" />
                <div className="w-2.5 h-2.5 rounded-full border-2 border-neon-primary/30 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-neon-primary shadow-[0_0_10px_#ff007f]" />
                </div>
                <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-neon-primary opacity-50" />
            </div>
        </motion.div>
    );
}
