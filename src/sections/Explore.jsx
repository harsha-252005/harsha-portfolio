import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

const exploreItems = [
    {
        title: 'Guestbook',
        category: 'COMMUNITY',
        description: 'Leave your mark and see what others have to say about my work.',
        link: '#contact'
    },
    {
        title: 'Achievements',
        category: 'MILESTONES',
        description: 'Professional certifications, technical accomplishments, and awards.',
        link: '#contact'
    },
    {
        title: 'Platform',
        category: 'STATS',
        description: 'Real-time performance metrics from LeetCode and GitHub repositories.',
        link: '#contact'
    }
];

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

export default function Explore() {
    return (
        <section id="explore" className="snap-section">
            <div className="cyber-grid opacity-5" />
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col gap-16"
            >
                <div className="flex flex-col gap-8">
                    <motion.div variants={itemVariants} className="category-header">
                        <div />
                        <span>More to Explore</span>
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-none">
                        Deep Dive.
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-3 gap-0 border border-white/5 bg-white/[0.02]">
                    {exploreItems.map((item) => (
                        <motion.a
                            key={item.title}
                            href={item.link}
                            variants={itemVariants}
                            className="p-8 md:p-12 flex flex-col gap-8 border-r border-b md:border-b-0 border-white/5 hover:bg-white/[0.03] transition-all group"
                        >
                            <div className="flex flex-col gap-4">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-secondary">{item.category}</span>
                                <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                                <p className="text-sm text-secondary leading-relaxed font-medium">
                                    {item.description}
                                </p>
                            </div>

                            <div className="mt-auto flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-white/40 group-hover:text-white transition-colors">
                                View Section <HiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
