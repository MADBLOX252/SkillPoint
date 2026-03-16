import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <motion.h1 
          className="text-8xl md:text-9xl font-bold tracking-tighter mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-white">Skill</span>
          <span className="text-brand-accent">Point</span>
        </motion.h1>
        <p className="text-xl md:text-2xl text-white/60 font-light tracking-wide max-w-2xl mx-auto mb-8">
          Empowering students to succeed, together.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link to="/subjects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-accent text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 group"
            >
              Explore Subjects <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <ChevronDown className="animate-bounce" />
      </motion.div>
    </section>
  );
};

export const About = () => {
  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
      >
        <div>
          <h2 className="text-4xl font-serif italic mb-8 text-brand-accent">For students By students</h2>
          <p className="text-5xl font-bold tracking-tighter mb-8 leading-tight">
            Education for everyone.
          </p>
        </div>
        <div className="space-y-6 text-lg text-white/70 leading-relaxed font-light">
          <p>
            At SkillPoint, we create learning tools by students, for students. Focused on IGCSE CAIE exams, our platform offers comprehensive study materials, practice resources, and personalized tools to help you excel.
          </p>
          <p>
            From revision guides to expert insights, we equip you to master subjects like Maths, Physics, and Chemistry. We understand the pressure of exams and provide flexible, effective resources tailored to different learning styles.
          </p>
          <p>
            Our mission is to make quality education accessible and help you succeed, unlocking opportunities for your academic future. SkillPoint is your trusted study partner on the path to success.
          </p>
        </div>
      </motion.div>
    </section>
  );
};
