import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Download, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PHYSICS_CURRICULUM, Chapter } from '../constants';

export const SubjectExplorer = () => {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-6xl font-bold tracking-tighter mb-4">Physics</h1>
        <p className="text-xl text-white/50">IGCSE {PHYSICS_CURRICULUM.code}</p>
      </motion.div>

      <div className="space-y-4">
        {PHYSICS_CURRICULUM.chapters.map((chapter) => (
          <ChapterItem 
            key={chapter.id} 
            chapter={chapter} 
            isExpanded={expandedChapter === chapter.id}
            onToggle={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface ChapterItemProps {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
}

const ChapterItem = ({ chapter, isExpanded, onToggle }: ChapterItemProps) => {
  const Icon = chapter.icon;

  return (
    <div className="glass rounded-3xl overflow-hidden transition-all duration-300">
      <button 
        onClick={onToggle}
        className="w-full p-8 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
      >
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
            <Icon size={24} />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight">{chapter.title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          className="text-white/30"
        >
          <ChevronRight size={24} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-8 pb-8 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapter.subChapters.map((sub) => (
                <Link 
                  key={sub.id}
                  to={`/notes/${chapter.id}/${sub.id}`}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-accent/30 hover:bg-white/10 transition-all group flex items-center justify-between"
                >
                  <span className="font-medium text-white/80 group-hover:text-white transition-colors">{sub.title}</span>
                  <ChevronRight size={16} className="text-white/20 group-hover:text-brand-accent transition-colors" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
