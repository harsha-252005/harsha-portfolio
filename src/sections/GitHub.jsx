import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import SectionTitle from '../components/SectionTitle';

export default function GitHub() {
    const { isDark } = useTheme();
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch('https://api.github.com/users/harsha-252005')
            .then(r => r.json()).then(setProfile).catch(() => { });
        fetch('https://api.github.com/users/harsha-252005/repos?sort=updated&per_page=6')
            .then(r => r.json()).then(d => { if (Array.isArray(d)) setRepos(d); }).catch(() => { });
    }, []);

    return (
        <section id="github" className="snap-section">
            <div className="max-w-6xl mx-auto px-6">
                <SectionTitle label="— ACTIVITY —" title="GitHub Contributions" subtitle="Real-time repository metrics and open-source involvement." />

                {profile && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`p-10 rounded-2xl mb-12 flex flex-col items-center text-center card ${isDark ? 'card-dark' : 'card-light'
                            }`}
                    >
                        <img
                            src={profile.avatar_url}
                            alt="GitHub"
                            className={`w-24 h-24 rounded-full border-4 mb-6 ${isDark ? 'border-white/5' : 'border-black/5'}`}
                        />
                        <h3 className={`font-heading text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {profile.name || profile.login}
                        </h3>
                        <p className={`text-sm tracking-wide mb-8 ${isDark ? 'text-text-muted' : 'text-gray-500'}`}>
                            @{profile.login} — Full Stack Developer
                        </p>

                        <div className="flex items-center gap-12 border-t border-white/5 pt-8 w-full justify-center">
                            {[
                                { label: 'Repos', value: profile.public_repos },
                                { label: 'Followers', value: profile.followers },
                                { label: 'Following', value: profile.following },
                            ].map(s => (
                                <div key={s.label}>
                                    <div className={`text-2xl font-bold font-mono mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>{s.value}</div>
                                    <div className={`text-[10px] tracking-widest uppercase font-bold ${isDark ? 'text-text-muted' : 'text-gray-400'}`}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {repos.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map((repo, i) => (
                            <motion.a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className={`p-6 rounded-xl text-center flex flex-col items-center card ${isDark ? 'card-dark' : 'card-light'}`}
                            >
                                <FaGithub size={20} className="mb-4 text-neon-primary/60" />
                                <h4 className="font-bold text-sm mb-2 transition-colors text-white hover:text-neon-primary">
                                    {repo.name}
                                </h4>
                                <p className={`text-xs mb-6 line-clamp-2 h-8 ${isDark ? 'text-text-muted' : 'text-gray-500'}`}>
                                    {repo.description || 'Modern web application module'}
                                </p>
                                <div className="flex items-center gap-4 text-[10px] font-bold font-mono text-text-muted mt-auto">
                                    <span className="flex items-center gap-1"><FaStar size={10} /> {repo.stargazers_count}</span>
                                    <span className="flex items-center gap-1"><FaCodeBranch size={10} /> {repo.forks_count}</span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
