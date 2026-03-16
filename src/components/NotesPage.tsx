import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { PHYSICS_CURRICULUM } from '../constants';

export const NotesPage = () => {
  const { chapterId, subChapterId } = useParams();
  
  const chapter = PHYSICS_CURRICULUM.chapters.find(c => c.id === chapterId);
  const subChapter = chapter?.subChapters.find(s => s.id === subChapterId);

  if (!chapter || !subChapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Notes not found</h1>
          <Link to="/subjects" className="text-brand-accent hover:underline">Back to subjects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <Link 
          to="/subjects" 
          className="inline-flex items-center gap-2 text-white/40 hover:text-brand-accent transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Curriculum
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-brand-accent font-mono text-sm uppercase tracking-widest mb-2 block">
              {chapter.title}
            </span>
            <h1 className="text-5xl font-bold tracking-tighter">{subChapter.title}</h1>
          </div>
          
          <motion.a
            href={subChapter.downloadUrl}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-brand-accent transition-colors"
          >
            <Download size={20} /> Download PDF
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-8 md:p-12 min-h-[400px]"
      >
        <div className="flex items-center gap-3 mb-8 text-white/30">
          <FileText size={24} />
          <span className="text-sm font-medium uppercase tracking-widest">Revision Notes</span>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-white/80 leading-relaxed mb-8">
            {subChapter.notes}
          </p>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Key Concepts</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-accent mt-2" />
                <p className="text-white/60">Comprehensive coverage of the IGCSE syllabus requirements for this topic.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-accent mt-2" />
                <p className="text-white/60">Step-by-step explanations of complex physical phenomena.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-accent mt-2" />
                <p className="text-white/60">Important formulas and units highlighted for quick revision.</p>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
