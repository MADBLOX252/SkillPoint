import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero, About, Features, LearningPath, CTA } from './components/HomeSections';
import { SubjectExplorer } from './components/SubjectExplorer';
import { NotesPage } from './components/NotesPage';

const HomePage = () => (
  <main>
    <Hero />
    <About />
    <Features />
    <LearningPath />
    <CTA />
    <footer className="py-20 px-6 border-t border-white/5 text-center">
      <div className="text-4xl font-bold tracking-tighter mb-4">
        <span className="text-white">Skill</span>
        <span className="text-brand-accent">Point</span>
      </div>
      <p className="text-white/40 text-sm">Empowering students to succeed, together.</p>
    </footer>
  </main>
);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-brand-bg selection:bg-brand-accent selection:text-black">
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subjects" element={<SubjectExplorer />} />
          <Route path="/subjects/:subjectId" element={<SubjectExplorer />} />
          <Route path="/subjects/:subjectId/:section" element={<SubjectExplorer />} />
          <Route path="/notes/:subjectId/:chapterId/:subChapterId" element={<NotesPage />} />
        </Routes>
      </div>
    </Router>
  );
}
