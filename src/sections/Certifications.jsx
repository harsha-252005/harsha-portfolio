import { motion } from 'framer-motion';
import { HiBadgeCheck } from 'react-icons/hi';
import { FaAws, FaReact, FaJava } from 'react-icons/fa';
import { SiSpringboot } from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';
import SectionTitle from '../components/SectionTitle';

const certs = [
    { title: 'AWS Developer Associate', icon: <FaAws size={24} />, provider: 'Amazon Web Services' },
    { title: 'React Web Developer', icon: <FaReact size={24} />, provider: 'Meta' },
    { title: 'Spring Boot Specialist', icon: <SiSpringboot size={24} />, provider: 'Infosys' },
    { title: 'Java Foundation', icon: <FaJava size={24} />, provider: 'Oracle' },
];

export default function Certifications() {
    const { isDark } = useTheme();

    return (
        <section id="certifications" className="snap-section">
            <div className="max-w-5xl mx-auto px-6">
                <SectionTitle label="— CREDENTIALS —" title="Certifications" subtitle="Professional certifications and technical accomplishments." />

                <div className="grid sm:grid-cols-2 gap-6">
                    {certs.map((c, i) => (
                        <motion.div
                            key={c.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className={`p-8 rounded-2xl flex flex-col items-center text-center card ${isDark ? 'card-dark' : 'card-light'
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${isDark ? 'bg-white/5 text-accent-soft' : 'bg-accent/5 text-accent'
                                }`}>
                                {c.icon}
                            </div>
                            <h3 className={`font-heading text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {c.title}
                            </h3>
                            <p className={`text-xs tracking-wide mb-4 ${isDark ? 'text-text-muted' : 'text-gray-500'}`}>
                                {c.provider}
                            </p>
                            <div className={`flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase ${isDark ? 'text-green-400/70' : 'text-green-600'
                                }`}>
                                <HiBadgeCheck size={14} /> Certified
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
