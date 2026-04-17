import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Home, Info } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="glass rounded-full px-8 py-3 flex items-center gap-8"
      >
        <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
          <span className="text-brand-accent">Skill</span>Point
        </Link>
        <div className="h-4 w-[1px] bg-white/20" />
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link 
            to="/" 
            className={`hover:text-brand-accent transition-colors flex items-center gap-1 ${location.pathname === '/' ? 'text-brand-accent' : 'text-white/70'}`}
          >
            <Home size={16} /> Home
          </Link>
          <Link 
            to="/subjects" 
            className={`hover:text-brand-accent transition-colors flex items-center gap-1 ${location.pathname.startsWith('/subjects') ? 'text-brand-accent' : 'text-white/70'}`}
          >
            <BookOpen size={16} /> Subjects
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};
