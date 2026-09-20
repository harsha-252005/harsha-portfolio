import { motion } from 'framer-motion';
import { HiTrophy } from 'react-icons/hi2';
import { useTheme } from '../context/ThemeContext';
import SectionTitle from '../components/SectionTitle';

export default function Achievements() {
    const { isDark } = useTheme();

    return (
        <section id="achievements" className="snap-section">
            <div className="max-w-4xl mx-auto px-6">
                <SectionTitle label="— RECOGNITION —" title="Achievements" subtitle="Celebrating professional milestones and competition successes." />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className={`p-10 rounded-2xl flex flex-col items-center text-center card overflow-hidden relative ${isDark ? 'card-dark' : 'card-light'
                        }`}
                >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-8 relative z-10 bg-neon-primary/10 text-neon-primary border border-neon-primary/20 shadow-[0_0_30px_rgba(255,0,127,0.2)]">
                        <HiTrophy size={28} />
                    </div>

                    <h3 className={`font-heading text-xl md:text-2xl font-bold mb-4 relative z-10 ${isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                        SAP Hack Fest Regional Finalist
                    </h3>
                    <p className={`text-sm md:text-base leading-relaxed max-w-xl relative z-10 ${isDark ? 'text-text-secondary' : 'text-gray-500'
                        }`}>
                        Successfully reached the regional finals of the SAP Hack Fest, competing against teams
                        across the region with an innovative solution focused on enterprise problem-solving.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
