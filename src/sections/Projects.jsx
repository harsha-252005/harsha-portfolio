import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaFolderOpen, FaGithub } from 'react-icons/fa';

const projects = [
  { title: 'LMS Platform', description: 'A learning management system designed to help bridge the educational gap in rural areas.', tech: 'React, Spring Boot, MySQL', github: 'https://github.com/harsha-252005/lms_rural', visual: 'lms', image: '/lms-platform.png' },
  { title: 'FarmNect', description: 'An agri-tech platform that connects farmers directly with consumers and markets.', tech: 'React, Spring Boot, MySQL', github: 'https://github.com/harsha-252005/Farmnect', visual: 'farm', image: '/farmnect.png' },
  { title: 'Freelance Platform', description: 'A collaboration marketplace for freelancers and clients to work on technical projects.', tech: 'Java, Spring Boot, REST API', github: 'https://github.com/harsha-252005/FreeLancer_Platform', visual: 'freelance', image: '/freelance-platform.png' },
  { title: 'Migo Health', description: 'A secure digital record platform for effectively managing migrant health data.', tech: 'React, Spring Boot, REST API', github: 'https://github.com/harsha-252005', visual: 'health', image: '/migo-health.png' },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  const current = projects[active];
  const move = (direction) => setActive((index) => (index + direction + projects.length) % projects.length);

  useEffect(() => {
    const timer = window.setInterval(() => move(1), 5500);
    return () => window.clearInterval(timer);
  }, []);

  return <section id="projects" className="software-section"><div className="software-shell">
    <div className="software-heading"><h2>/ software</h2><span aria-hidden="true" /><a href="https://github.com/harsha-252005" target="_blank" rel="noreferrer">View all projects <b aria-hidden="true">&rarr;</b></a></div>

    <div className="software-carousel" aria-roledescription="carousel" aria-label="Featured software projects">
      <div className={`software-slide software-slide--${current.visual}`} key={current.title}>
        <img className="software-slide-image" src={current.image} alt="" />
        <div className="software-slide-copy">
          <h3>{current.title}</h3><p>{current.description}</p><strong>{current.tech}</strong>
          <div className="software-slide-links"><a href={current.github} target="_blank" rel="noreferrer"><FaGithub /> Source</a><a href={current.github} target="_blank" rel="noreferrer"><FaExternalLinkAlt /> Open project</a></div>
        </div>
      </div>
      <button className="software-carousel-control software-carousel-control--prev" onClick={() => move(-1)} aria-label="Previous featured project"><FaChevronLeft /></button>
      <button className="software-carousel-control software-carousel-control--next" onClick={() => move(1)} aria-label="Next featured project"><FaChevronRight /></button>
      <div className="software-carousel-dots">{projects.map((project, index) => <button key={project.title} onClick={() => setActive(index)} className={index === active ? 'is-active' : ''} aria-label={`Show ${project.title}`} aria-current={index === active ? 'true' : undefined} />)}</div>
    </div>

    <ul className="software-grid">{projects.map((project) => <li className="software-card" key={project.title}>
      <div className="software-card-top"><FaFolderOpen className="software-folder" aria-hidden="true" /><div className="software-links"><a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`}><FaGithub /></a><a href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><FaExternalLinkAlt /></a></div></div>
      <h3>{project.title}</h3><p>{project.description}</p><span className="software-tech">{project.tech}</span>
    </li>)}</ul>
  </div></section>;
}
