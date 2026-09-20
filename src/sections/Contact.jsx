import { FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function Contact() {
  return <section id="contact" className="contact-section"><div className="contact-shell">
    <div className="contact-heading"><h2>/ get in touch</h2><span /></div>
    <div className="contact-layout">
      <div className="contact-copy"><p>Have an idea, opportunity, or question? Send a message and I&apos;ll get back to you as soon as I can.</p><a href="mailto:hv200525@gmail.com">hv200525@gmail.com</a><div className="contact-socials">{[[FaGithub, 'GitHub', 'https://github.com/harsha-252005'], [FaLinkedin, 'LinkedIn', 'https://www.linkedin.com/in/harshvardhan-rengaraju-5583372a0/'], [SiLeetcode, 'LeetCode', 'https://leetcode.com/u/8941_harsha/']].map(([Icon, label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label}><Icon /></a>)}</div></div>
      <form className="contact-form" action="https://formsubmit.co/hv200525@gmail.com" method="POST">
        <input type="hidden" name="_subject" value="New portfolio contact message" /><input type="hidden" name="_template" value="table" /><input type="hidden" name="_captcha" value="false" />
        <label>Name<input type="text" name="name" placeholder="Your name" autoComplete="name" required /></label>
        <label>Email<input type="email" name="email" placeholder="you@example.com" autoComplete="email" required /></label>
        <label>Message<textarea name="message" placeholder="Tell me about your project or opportunity..." rows="5" required /></label>
        <button type="submit"><FaPaperPlane /> Send message</button>
      </form>
    </div>
  </div></section>;
}
