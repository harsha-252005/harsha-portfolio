import { useState } from 'react';
import { FaBars, FaEnvelope, FaGithub, FaLinkedin, FaPen, FaTimes } from 'react-icons/fa';

const resumeUrl = 'https://drive.google.com/file/d/1vpQNw-pPYRVLtFbTjzz7_3waWzstz-QB/view?usp=drivesdk';
const links = [{ label: 'Home', href: '#home' }, { label: 'About', href: '#about' }, { label: 'Experience', href: '#skills' }, { label: 'Software', href: '#projects' }, { label: 'Resume', href: resumeUrl, external: true }, { label: 'Certifications', href: '#certifications' }];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  return <header className="fixed top-0 z-50 w-full border-b border-[#233554] bg-[#0a192f]/95 backdrop-blur"><nav className="relative mx-auto flex h-14 max-w-[1680px] items-center gap-4 px-5 md:h-[76px] md:gap-8 md:px-12">
    <a href="#home" className="brand-name hidden shrink-0 md:block" onClick={closeMenu}>Harshvardhan R</a>
    <div className="hidden items-center gap-6 lg:flex">{links.map(link => <a key={link.label} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined} className="text-[14px] font-bold text-[#ccd6f6] no-underline transition hover:text-[#64ffda]">{link.label}</a>)}</div>
    <div className="ml-auto hidden items-center gap-5 text-[#ccd6f6] sm:flex"><a className="site-link" aria-label="Contact" href="#contact"><FaEnvelope size={20}/></a><a className="site-link" aria-label="GitHub" href="https://github.com/harsha-252005" target="_blank" rel="noreferrer"><FaGithub size={20}/></a><a className="site-link" aria-label="LinkedIn" href="https://www.linkedin.com/in/harshvardhan-rengaraju-5583372a0/" target="_blank" rel="noreferrer"><FaLinkedin size={20}/></a><a className="site-link" aria-label="Contact" href="#contact"><FaPen size={19}/></a></div>
    <button className="mr-auto ml-0 grid h-10 w-10 place-items-center rounded-lg border border-[#233554] bg-transparent text-xl text-[#a8b2d1] md:ml-auto md:mr-0 md:border-0 md:text-[#64ffda] lg:hidden" type="button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <FaTimes /> : <FaBars />}</button>
    {open && <div className="absolute left-0 top-14 grid w-full gap-1 border-b border-[#233554] bg-[#0a192f] px-5 py-4 shadow-2xl md:top-[76px] lg:hidden">{links.map(link => <a key={link.label} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined} onClick={closeMenu} className="rounded px-3 py-2 font-['NTR'] text-[20px] text-[#ccd6f6] no-underline hover:bg-[#112240] hover:text-[#64ffda]">{link.label}</a>)}<div className="mt-2 flex gap-5 border-t border-[#233554] px-3 pt-4 text-[#ccd6f6]"><a className="site-link" aria-label="Contact" href="#contact" onClick={closeMenu}><FaEnvelope size={20}/></a><a className="site-link" aria-label="GitHub" href="https://github.com/harsha-252005" target="_blank" rel="noreferrer"><FaGithub size={20}/></a><a className="site-link" aria-label="LinkedIn" href="https://www.linkedin.com/in/harshvardhan-rengaraju-5583372a0/" target="_blank" rel="noreferrer"><FaLinkedin size={20}/></a><a className="site-link" aria-label="Contact" href="#contact" onClick={closeMenu}><FaPen size={19}/></a></div></div>}
  </nav></header>;
}
