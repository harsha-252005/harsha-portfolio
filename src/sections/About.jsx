import { useState } from 'react';

export default function About() {
  const technologies = ['Java', 'Spring Boot', 'React.js', 'MySQL', 'REST APIs', 'Git / GitHub'];
  const [isFloating, setIsFloating] = useState(false);
  const floatPhoto = () => {
    setIsFloating(false);
    requestAnimationFrame(() => setIsFloating(true));
  };
  return <section id="about" className="about-section"><div className="about-shell">
    <div className="about-heading"><h2>/ about me</h2><span/></div>
    <div className="about-layout"><div className="about-copy">
      <p>I&apos;m currently an <strong>Information Technology student</strong> at <a href="https://skcet.ac.in/" target="_blank" rel="noreferrer">Sri Krishna College of Engineering and Technology</a>, where I build dependable full-stack applications and grow through practical engineering work.</p>
      <p>Here are some technologies I have been working with:</p>
      <ul>{technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
      <p>I enjoy turning real ideas into polished digital products—especially where intuitive interfaces meet scalable Java and Spring Boot backends.</p>
    </div><button type="button" className={`about-photo${isFloating ? ' about-photo--floating' : ''}`} onClick={floatPhoto} onAnimationEnd={() => setIsFloating(false)} aria-label="Animate Harshvardhan's profile photo"><img src="/harshvardhan-profile.jpeg" alt="Harshvardhan R"/></button></div>
  </div></section>;
}
