import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero, About } from './components/HomeSections';
import { SubjectExplorer } from './components/SubjectExplorer';
import { NotesPage } from './components/NotesPage';

const HomePage = () => (
  <main>
    <Hero />
    <About />
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
  return (
    <Router>
      <div className="min-h-screen bg-brand-bg selection:bg-brand-accent selection:text-black">
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subjects" element={<SubjectExplorer />} />
          <Route path="/notes/:chapterId/:subChapterId" element={<NotesPage />} />
        </Routes>
      </div>
    </Router>
  );
}
