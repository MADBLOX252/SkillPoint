import { useEffect, html } from './lib/preact.js';
import { Router, Route, Switch } from 'https://esm.sh/wouter@3/preact';
import { useHashLocation } from 'https://esm.sh/wouter@3/preact/use-hash-location';
import Lenis from 'https://esm.sh/lenis';
import { CustomCursor } from './components/CustomCursor.js';
import { Navbar } from './components/Navbar.js';
import { Hero, About, Features, LearningPath, CTA } from './components/HomeSections.js';
import { SubjectExplorer } from './components/SubjectExplorer.js';
import { NotesPage } from './components/NotesPage.js';

const HomePage = () => html`
  <main>
    <${Hero} />
    <${About} />
    <${Features} />
    <${LearningPath} />
    <${CTA} />
    <footer className="py-20 px-6 border-t border-white/5 text-center">
      <div className="text-4xl font-bold tracking-tighter mb-4">
        <span className="text-white">Skill</span>
        <span className="text-brand-accent">Point</span>
      </div>
      <p className="text-white/40 text-sm">Empowering students to succeed, together.</p>
    </footer>
  </main>
`;

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

  return html`
    <${Router} hook=${useHashLocation}>
      <div className="min-h-screen bg-brand-bg selection:bg-brand-accent selection:text-black">
        <${CustomCursor} />
        <${Navbar} />
        <${Switch}>
          <${Route} path="/" component=${HomePage} />
          <${Route} path="/subjects" component=${SubjectExplorer} />
          <${Route} path="/subjects/:subjectId" component=${SubjectExplorer} />
          <${Route} path="/subjects/:subjectId/:section" component=${SubjectExplorer} />
          <${Route} path="/notes/:subjectId/:chapterId/:subChapterId" component=${NotesPage} />
        </${Switch}>
      </div>
    </${Router}>
  `;
}
