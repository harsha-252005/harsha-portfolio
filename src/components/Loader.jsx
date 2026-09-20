import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            onAnimationComplete={() => document.body.style.overflowY = 'auto'}
            className="fixed inset-0 z-[1000] bg-cyber-bg flex flex-col items-center justify-center"
        >
            <div className="relative">
                <motion.div
                    animate={{
                        rotate: 360,
                        transition: { duration: 2, repeat: Infinity, ease: "linear" }
                    }}
                    className="w-32 h-32 rounded-full border-2 border-neon-cyan/20 border-t-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.2)]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-neon-cyan font-black text-xl tracking-[0.2em]"
                    >
                        H
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-[1px] bg-neon-cyan mt-12 shadow-[0_0_10px_#00f3ff]"
            />

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-[10px] uppercase tracking-[0.5em] text-text-dim font-bold"
            >
                Initializing Cyber System
            </motion.p>
        </motion.div>
    );
}
