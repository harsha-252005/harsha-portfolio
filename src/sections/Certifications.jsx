import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';

const certifications = [
  {
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    type: 'AWS Certification',
    date: 'Issued Aug 2, 2026 · Expires Aug 2, 2029',
    image: '/aws-ai-practitioner.jpg',
    imageAlt: 'AWS Certified AI Practitioner certificate',
    verification: 'https://aws.amazon.com/verification',
    verificationLabel: 'Verify credential',
    detail: 'Validation number: 6351ca30c8114e9484905fb9071df0aa',
    skills: ['AI & ML on AWS', 'Generative AI', 'Machine Learning', 'AWS Cloud'],
  },
  {
    title: 'Data Analyst with ML Essentials',
    issuer: 'NeoColab / iamneo',
    type: 'Professional Elective Program · SKCET',
    date: 'Completed Aug 8, 2026',
    image: '/data-analyst-ml-essentials.jpg',
    imageAlt: 'Data Analyst with ML Essentials certificate',
    detail: 'Professional Elective Program at Sri Krishna College of Engineering & Technology.',
    skills: ['Python', 'Power BI', 'Statistical Methods', 'Machine Learning', 'LLMs'],
  },
];

export default function Certifications() {
  return <section id="certifications" className="certifications-section"><div className="certifications-shell">
    <div className="certifications-heading"><h2>/ certifications</h2><span aria-hidden="true" /></div>
    <div className="certifications-grid">{certifications.map((certification) => <article className="certification-card" key={certification.title}>
      <div className="certification-image"><img src={certification.image} alt={certification.imageAlt} /></div>
      <div className="certification-content"><div className="certification-icon"><FaCertificate aria-hidden="true" /></div><p className="certification-issuer">{certification.issuer}</p>
        <h3>{certification.title}</h3><p className="certification-type">{certification.type}</p><p className="certification-date">{certification.date}</p><p className="certification-detail">{certification.detail}</p>
        {certification.verification && <a className="certification-verify" href={certification.verification} target="_blank" rel="noreferrer">{certification.verificationLabel} <FaExternalLinkAlt aria-hidden="true" /></a>}
        <ul className="certification-skills">{certification.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
      </div>
    </article>)}</div>
  </div></section>;
}
