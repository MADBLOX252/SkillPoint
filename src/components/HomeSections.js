import { h } from 'https://esm.sh/preact';
import { html } from '../lib/preact.js';
import { motion, useScroll, useTransform } from 'https://esm.sh/framer-motion?alias=react:preact/compat,react-dom:preact/compat';
import { ArrowRight, ChevronDown, CheckCircle2, GraduationCap, Zap, BookOpen, Users, Globe } from 'https://esm.sh/lucide-preact';
import { Link } from 'https://esm.sh/wouter@3/preact';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const rotate = useTransform(scrollY, [0, 500], [0, 25]);

  return html`
    <section className="relative min-h-[110vh] flex flex-col items-center justify-center pt-20 px-6 overflow-hidden bg-[#050505]">
      <${motion.div} 
        style=${{ x: y1, opacity: 0.05 }}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[30vw] font-black pointer-events-none whitespace-nowrap select-none uppercase"
      >
        Excellence
      </${motion.div}>

      <${motion.div} 
        style=${{ y: y1 }}
        className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] bg-brand-accent/5 rounded-full blur-[100px]" 
      />
      <${motion.div} 
        style=${{ y: y2, rotate }}
        className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-emerald-500/5 rounded-full blur-[100px]" 
      />

      <${motion.div}
        initial=${{ opacity: 0, y: 30 }}
        animate=${{ opacity: 1, y: 0 }}
        style=${{ opacity }}
        transition=${{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center z-10"
      >
        <${motion.div}
          initial=${{ scale: 0.9, opacity: 0 }}
          animate=${{ scale: 1, opacity: 1 }}
          transition=${{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter leading-[0.85] mb-6">
            <span className="text-white block">Skill</span>
            <span className="text-brand-accent block mt-2">Point</span>
          </h1>
        </${motion.div}>
        
        <p className="text-xl md:text-3xl text-white/40 font-light tracking-tight max-w-2xl mx-auto mb-12">
          Master your IGCSE & A-Levels with resources crafted by high-achieving students.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <${Link} href="/subjects">
            <${motion.button}
              whileHover=${{ scale: 1.02 }}
              whileTap=${{ scale: 0.98 }}
              className="bg-brand-accent text-black px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 group shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:shadow-[0_0_50px_rgba(0,255,136,0.5)] transition-all"
            >
              Start Learning <${ArrowRight} size=${22} className="group-hover:translate-x-1 transition-transform" />
            </${motion.button}>
          </${Link}>
          <${motion.button} 
            onClick=${() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover=${{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            className="px-10 py-5 rounded-full font-medium text-white/60 hover:text-white transition-colors border border-white/10"
          >
            Learn More
          </${motion.button}>
        </div>
      </${motion.div}>

      <${motion.div} 
        initial=${{ opacity: 0 }}
        animate=${{ opacity: 1 }}
        transition=${{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-3 text-white/20"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll to experience</span>
        <${motion.div}
          animate=${{ y: [0, 8, 0] }}
          transition=${{ duration: 2, repeat: Infinity }}
        >
          <${ChevronDown} size=${20} />
        </${motion.div}>
      </${motion.div}>
    </section>
  `;
};

export const About = () => {
  return html`
    <section id="about" className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <${motion.div}
          initial=${{ opacity: 0, y: 40 }}
          whileInView=${{ opacity: 1, y: 0 }}
          viewport=${{ once: true, margin: "-100px" }}
          transition=${{ duration: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
        >
          <div className="order-2 lg:order-1">
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold tracking-widest uppercase mb-8">
              Our Philosophy
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-tight">
              By Students. <br />
              <span className="text-white/30 italic font-light">For Students.</span>
            </h2>
            <div className="space-y-8 text-xl text-white/50 leading-relaxed font-light">
              <p>
                SkillPoint isn't just a resource hub—it's a community built on the shared experiences of students who navigated the IGCSE and A-Level journey successfully.
              </p>
              <p>
                We understand the pressure, the late nights, and the confusion. That's why every piece of content is curated to provide the clarity we wished we had.
              </p>
              <div className="flex flex-wrap gap-8 pt-6">
                <div className="flex flex-col gap-1">
                  <span className="text-4xl font-bold text-white tracking-tighter">10k+</span>
                  <span className="text-xs uppercase tracking-widest text-brand-accent">Resources</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-4xl font-bold text-white tracking-tighter">24/7</span>
                  <span className="text-xs uppercase tracking-widest text-brand-accent">Access</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-4xl font-bold text-white tracking-tighter">100%</span>
                  <span className="text-xs uppercase tracking-widest text-brand-accent">Free</span>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <${motion.div}
              initial=${{ scale: 0.9, opacity: 0 }}
              whileInView=${{ scale: 1, opacity: 1 }}
              viewport=${{ once: true }}
              transition=${{ duration: 1.2 }}
              className="aspect-square rounded-[3rem] bg-gradient-to-br from-brand-accent/20 to-emerald-500/10 border border-white/5 flex items-center justify-center p-12"
            >
              <${BookOpen} size=${160} className="text-brand-accent opacity-20 absolute" />
              <div className="glass p-8 rounded-3xl border-white/10 relative z-10 translate-x-4 -translate-y-4">
                <${CheckCircle2} size=${32} className="text-brand-accent mb-4" />
                <h4 className="text-xl font-bold mb-2">Curated Notes</h4>
                <p className="text-sm text-white/40">Precisely mapped to latest syllabus requirements.</p>
              </div>
              <div className="glass p-8 rounded-3xl border-white/10 absolute bottom-12 right-12 z-10 -translate-x-8 translate-y-8">
                <${Zap} size=${32} className="text-brand-accent mb-4" />
                <h4 className="text-xl font-bold mb-2">Exam Tips</h4>
                <p className="text-sm text-white/40">Shortcuts and strategies used by top achievers.</p>
              </div>
            </${motion.div}>
          </div>
        </${motion.div}>
      </div>
    </section>
  `;
};

export const Features = () => {
  const features = [
    { icon: BookOpen, title: "Comprehensive Notes", desc: "Detailed chapter-wise notes compiled from top resources and examiner reports." },
    { icon: Zap, title: "Topical Practice", desc: "Sorted past paper questions to help you master specific topics one by one." },
    { icon: GraduationCap, title: "Revision Guides", desc: "The essential 'must-knows' for every subject, simplified for last-minute review." },
    { icon: Users, title: "Student Forum", desc: "Connect with others taking the same exams and share insights." },
    { icon: Globe, title: "Global Reach", desc: "Used by students worldwide following the Cambridge international curriculum." },
    { icon: Zap, title: "Regular Updates", desc: "We stay on top of syllabus changes so you always have current material." }
  ];

  return html`
    <section className="py-40 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Built for Excellence</h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto">Focused tools designed to eliminate friction in your learning process.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${features.map((f, i) => html`
            <${motion.div}
              key=${i}
              initial=${{ opacity: 0, y: 20 }}
              whileInView=${{ opacity: 1, y: 0 }}
              viewport=${{ once: true }}
              transition=${{ delay: i * 0.1 }}
              className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-brand-accent/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-brand-accent mb-8 group-hover:scale-110 group-hover:bg-brand-accent/10 transition-all">
                <${f.icon} size=${28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">${f.title}</h3>
              <p className="text-white/40 leading-relaxed">${f.desc}</p>
            </${motion.div}>
          `)}
        </div>
      </div>
    </section>
  `;
};

export const LearningPath = () => {
  const steps = [
    { number: "01", title: "Select Subject", desc: "Choose from our wide range of IGCSE and A-Level subjects." },
    { number: "02", title: "Study Resources", desc: "Access curated notes, topic-wise guides, and textbooks." },
    { number: "03", title: "Practice Topical", desc: "Test your knowledge with focused past paper questions." },
    { number: "04", title: "Ace Exams", desc: "Use our final revision tips to secure your top grades." },
  ];

  return html`
    <section className="py-40 px-6 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          ${steps.map((step, i) => html`
            <${motion.div}
              key=${i}
              initial=${{ opacity: 0, x: -20 }}
              whileInView=${{ opacity: 1, x: 0 }}
              viewport=${{ once: true }}
              transition=${{ delay: i * 0.2 }}
              className="relative"
            >
              <div className="text-[120px] font-black text-white/[0.03] absolute -top-20 -left-10 select-none">
                ${step.number}
              </div>
              <div className="relative z-10 pt-10">
                <div className="w-12 h-1 bg-brand-accent mb-8" />
                <h3 className="text-3xl font-bold mb-4 tracking-tight">${step.title}</h3>
                <p className="text-white/40 leading-relaxed font-light">${step.desc}</p>
              </div>
            </${motion.div}>
          `)}
        </div>
      </div>
    </section>
  `;
};

export const CTA = () => {
  return html`
    <section className="py-60 px-6 relative">
      <div className="absolute inset-0 bg-brand-accent/5 blur-[120px] rounded-full scale-50" />
      <${motion.div}
        initial=${{ opacity: 0, scale: 0.9 }}
        whileInView=${{ opacity: 1, scale: 1 }}
        viewport=${{ once: true }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 italic">Ready to excel?</h2>
        <p className="text-2xl text-white/50 mb-12 font-light">Join thousands of students achieving their potential with SkillPoint.</p>
        <${Link} href="/subjects">
          <${motion.button}
            whileHover=${{ scale: 1.05 }}
            whileTap=${{ scale: 0.95 }}
            className="px-12 py-6 bg-white text-black rounded-full font-bold text-xl hover:bg-brand-accent transition-all"
          >
            Explore the Curriculum
          </${motion.button}>
        </${Link}>
      </${motion.div}>
    </section>
  `;
};
