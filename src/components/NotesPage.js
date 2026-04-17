import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Download, FileText, Play, Image as ImageIcon } from 'lucide-react';
import { CURRICULUM_DATA } from '../constants';

const ContentRenderer = ({ blocks }) => {
  return (
    <div className="space-y-12">
      {blocks.map((block, index) => {
        const revealProps = {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        };

        switch (block.type) {
          case 'heading':
            return (
              <motion.h2 key={index} {...revealProps} className="text-3xl font-bold text-white tracking-tight mt-12 mb-6">
                {block.content}
              </motion.h2>
            );
          case 'text':
            return (
              <motion.p key={index} {...revealProps} className="text-xl text-white/70 leading-relaxed">
                {block.content}
              </motion.p>
            );
          case 'image':
            return (
              <motion.figure key={index} {...revealProps} className="group">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                  <img 
                    src={block.url} 
                    alt={block.caption || 'Educational content'} 
                    className="w-full h-auto pointer-events-none select-none"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon size={16} className="text-brand-accent" />
                  </div>
                </div>
                {block.caption && (
                  <figcaption className="mt-4 text-sm text-white/40 italic text-center font-serif">
                    {block.caption}
                  </figcaption>
                )}
              </motion.figure>
            );
          case 'video':
            return (
              <motion.div key={index} {...revealProps} className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video group">
                  <video 
                    src={block.url} 
                    poster={block.poster}
                    controls 
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full"
                  />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <Play size={16} className="text-brand-accent fill-brand-accent" />
                  </div>
                </div>
                {block.caption && (
                  <p className="text-sm text-white/40 italic text-center font-serif">
                    {block.caption}
                  </p>
                )}
              </motion.div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export const NotesPage = () => {
  const { subjectId, chapterId, subChapterId } = useParams();
  
  const subject = subjectId ? CURRICULUM_DATA[subjectId] : null;
  const chapter = subject?.notes.find(c => c.id === chapterId);
  const subChapter = chapter?.subChapters.find(s => s.id === subChapterId);

  if (!subject || !chapter || !subChapter) {
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
          to={`/subjects/${subjectId}/notes`} 
          className="inline-flex items-center gap-2 text-white/40 hover:text-brand-accent transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Notes
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
        <div className="flex items-center gap-3 mb-12 text-white/30">
          <FileText size={24} />
          <span className="text-sm font-medium uppercase tracking-widest">Revision Notes</span>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <ContentRenderer blocks={subChapter.content} />
          
          <div className="mt-20 pt-12 border-t border-white/5 space-y-6">
            <h3 className="text-2xl font-bold text-white">Key Concepts</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-accent mt-2" />
                <p className="text-white/60">Comprehensive coverage of the {subject.category} syllabus requirements for this topic.</p>
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
