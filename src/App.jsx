import Navbar from './components/Navbar';
import GameMode from './components/GameMode';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <GameMode />
      <div className="snap-container">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
