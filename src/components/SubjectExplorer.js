import { h } from 'https://esm.sh/preact';
import { useState, html } from '../lib/preact.js';
import { motion, AnimatePresence } from 'https://esm.sh/framer-motion?alias=react:preact/compat,react-dom:preact/compat';
import { ChevronRight, Download, BookOpen, FileText, HelpCircle, Book, Link as LinkIcon, Folder } from 'https://esm.sh/lucide-preact';
import { Link, useParams, useLocation } from 'https://esm.sh/wouter@3/preact';
import { CURRICULUM_DATA, SUBJECTS_LIST } from '../constants.js';

export const SubjectExplorer = () => {
  const { subjectId, section } = useParams();
  const [location, navigate] = useLocation();
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);

  if (!subjectId) {
    const igcseSubjects = SUBJECTS_LIST.filter(s => s.category === 'IGCSE');
    const aLevelSubjects = SUBJECTS_LIST.filter(s => s.category === 'A-Level');

    return html`
      <div className="max-w-4xl mx-auto py-20 px-6">
        <${motion.div}
          initial=${{ opacity: 0, y: 20 }}
          animate=${{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-6xl font-bold tracking-tighter mb-4">Subjects</h1>
          <p className="text-xl text-white/50">Choose your curriculum to start learning</p>
        </${motion.div}>

        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-8 flex items-center gap-4">
              <span className="w-8 h-1 bg-brand-accent rounded-full" />
              IGCSE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${igcseSubjects.map((subject) => html`<${SubjectCard} key=${subject.id} subject=${subject} />`)}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-8 flex items-center gap-4">
              <span className="w-8 h-1 bg-brand-accent rounded-full" />
              A Levels
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${aLevelSubjects.map((subject) => html`<${SubjectCard} key=${subject.id} subject=${subject} />`)}
            </div>
          </section>
        </div>
      </div>
    `;
  }

  const subject = CURRICULUM_DATA[subjectId];

  if (!subject) {
    return html`
      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Subject not found</h1>
        <${Link} href="/subjects" className="text-brand-accent hover:underline">Back to subjects</${Link}>
      </div>
    `;
  }

  if (!section) {
    const categories = [
      { id: 'notes', title: 'Notes', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
      { id: 'topical-questions', title: 'Topical Questions', icon: HelpCircle, color: 'text-purple-400', bg: 'bg-purple-400/10' },
      { id: 'textbooks', title: 'Text Books', icon: Book, color: 'text-green-400', bg: 'bg-green-400/10' },
      { id: 'resources', title: 'Other Useful Resources', icon: LinkIcon, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    ];

    return html`
      <div className="max-w-4xl mx-auto py-20 px-6">
        <${motion.div}
          initial=${{ opacity: 0, y: 20 }}
          animate=${{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <${Link} href="/subjects" className="text-brand-accent hover:underline mb-4 inline-block">← Back to subjects</${Link}>
          <h1 className="text-6xl font-bold tracking-tighter mb-4">${subject.title}</h1>
          <p className="text-xl text-white/50">${subject.category} ${subject.code}</p>
        </${motion.div}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${categories.map((cat) => html`
            <${Link}
              key=${cat.id}
              href=${`/subjects/${subjectId}/${cat.id}`}
              className="glass p-8 rounded-3xl hover:bg-white/5 transition-all group border border-white/5 hover:border-brand-accent/30 flex flex-col gap-6"
            >
              <div className=${`w-16 h-16 rounded-2xl ${cat.bg} flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                <${cat.icon} size=${32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">${cat.title}</h3>
                <p className="text-white/40">Access curated ${cat.title.toLowerCase()} for this subject.</p>
              </div>
            </${Link}>
          `)}
        </div>
      </div>
    `;
  }

  const renderSectionContent = () => {
    const getGroupedItems = (items) => {
      const groups = {};
      items.forEach(item => {
        const cat = item.category || 'Other';
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(item);
      });
      return groups;
    };

    switch (section) {
      case 'notes':
        if (subject.notes.length > 0) {
          return html`
            <div className="space-y-4">
              ${subject.notes.map((chapter) => html`
                <${ChapterItem} 
                  key=${chapter.id} 
                  chapter=${chapter} 
                  subjectId=${subjectId}
                  isExpanded=${expandedChapter === chapter.id}
                  onToggle=${() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                />
              `)}
            </div>
          `;
        }
        
        if (subject.noteResources && subject.noteResources.length > 0) {
          const grouped = getGroupedItems(subject.noteResources);
          return html`
            <div className="space-y-12">
              ${Object.entries(grouped).map(([category, items]) => html`
                <section key=${category}>
                  <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-3 opacity-60">
                    <${Folder} size=${18} />
                    ${category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${items.map((item) => html`
                      <${ResourceCard} 
                        key=${item.id} 
                        item=${item} 
                        onPreview=${() => setPreviewItem(item)}
                      />
                    `)}
                  </div>
                </section>
              `)}
            </div>
          `;
        }

        return html`
          <div className="glass p-12 rounded-3xl text-center">
            <${FileText} size=${48} className="mx-auto mb-4 text-white/20" />
            <h3 className="text-xl font-bold mb-2">No notes available yet</h3>
            <p className="text-white/40">We are currently working on adding notes for this subject.</p>
          </div>
        `;

      case 'topical-questions':
      case 'textbooks':
      case 'resources':
        const rawItems = section === 'topical-questions' ? subject.topicalQuestions : 
                         section === 'textbooks' ? subject.textbooks : subject.resources;
        const sectionTitle = section === 'topical-questions' ? 'Topical Questions' : 
                             section === 'textbooks' ? 'Text Books' : 'Useful Resources';
        const SectionIcon = section === 'topical-questions' ? HelpCircle : 
                            section === 'textbooks' ? Book : LinkIcon;

        if (rawItems.length === 0) {
          return html`
            <div className="glass p-12 rounded-3xl text-center">
              <${SectionIcon} size=${48} className="mx-auto mb-4 text-white/20" />
              <h3 className="text-xl font-bold mb-2">No ${sectionTitle.toLowerCase()} available</h3>
              <p className="text-white/40">Check back later for updated content.</p>
            </div>
          `;
        }

        const groupedItems = getGroupedItems(rawItems);
        const hasCategories = rawItems.some(i => i.category);

        return html`
          <div className="space-y-12">
            ${Object.entries(groupedItems).map(([category, items]) => html`
              <section key=${category}>
                ${hasCategories && html`
                  <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-3 opacity-60">
                    <${Folder} size=${18} />
                    ${category}
                  </h2>
                `}
                <div className=${section === 'textbooks' ? 'flex flex-col gap-3' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                  ${items.map((item) => html`
                    <${ResourceCard} 
                      key=${item.id} 
                      item=${item} 
                      onPreview=${() => setPreviewItem(item)}
                      isListStyle=${section === 'textbooks'}
                    />
                  `)}
                </div>
              </section>
            `)}
          </div>
        `;
      default:
        return html`<div>Section not found</div>`;
    }
  };

  return html`
    <div className="max-w-4xl mx-auto py-20 px-6">
      <${motion.div}
        initial=${{ opacity: 0, y: 20 }}
        animate=${{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <${Link} href=${`/subjects/${subjectId}`} className="text-brand-accent hover:underline mb-4 inline-block">← Back to ${subject.title}</${Link}>
        <h1 className="text-6xl font-bold tracking-tighter mb-4">
          ${section === 'notes' ? 'Notes' : 
            section === 'topical-questions' ? 'Topical Questions' : 
            section === 'textbooks' ? 'Text Books' : 'Resources'}
        </h1>
        <p className="text-xl text-white/50">${subject.title} • ${subject.category}</p>
      </${motion.div}>

      ${renderSectionContent()}

      <${AnimatePresence}>
        ${previewItem && html`
          <${PreviewModal} item=${previewItem} onClose=${() => setPreviewItem(null)} />
        `}
      </${AnimatePresence}>
    </div>
  `;
};

const SubjectCard = ({ subject }) => {
  const Icon = subject.icon;
  return html`
    <${motion.div}
      initial=${{ opacity: 0, scale: 0.95 }}
      whileInView=${{ opacity: 1, scale: 1 }}
      viewport=${{ once: true, margin: "-50px" }}
      transition=${{ duration: 0.5 }}
    >
      <${Link} 
        href=${`/subjects/${subject.id}`}
        className="glass p-6 rounded-3xl hover:bg-white/5 transition-all group border border-white/5 hover:border-brand-accent/30 block"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
            <${Icon} size=${24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-tight">${subject.title}</h3>
            <p className="text-sm text-white/40">${subject.code}</p>
          </div>
        </div>
      </${Link}>
    </${motion.div}>
  `;
};

const ResourceCard = ({ item, onPreview, isListStyle }) => {
  if (isListStyle) {
    return html`
      <${motion.div} 
        initial=${{ opacity: 0, x: -20 }}
        whileInView=${{ opacity: 1, x: 0 }}
        viewport=${{ once: true }}
        transition=${{ duration: 0.4 }}
        onClick=${onPreview}
        className="glass p-6 rounded-2xl hover:bg-white/5 transition-all group border border-white/5 hover:border-brand-accent/30 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-brand-accent transition-colors shrink-0">
            <${Book} size=${24} />
          </div>
          <div>
            <h4 className="font-bold text-lg leading-tight group-hover:text-brand-accent transition-colors">${item.title}</h4>
            ${item.description && html`<p className="text-sm text-white/40 mt-1">${item.description}</p>`}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors hidden md:block">Preview Book</span>
          <${ChevronRight} size=${20} className="text-white/20 group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
        </div>
      </${motion.div}>
    `;
  }

  return html`
    <${motion.div}
      initial=${{ opacity: 0, y: 20 }}
      whileInView=${{ opacity: 1, y: 0 }}
      viewport=${{ once: true }}
      transition=${{ duration: 0.4 }}
    >
      <a 
        href=${item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="glass p-6 rounded-2xl hover:bg-white/5 transition-all group border border-white/5 hover:border-brand-accent/30 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-brand-accent transition-colors">
            ${item.type === 'pdf' ? html`<${FileText} size=${20} />` : html`<${LinkIcon} size=${20} />`}
          </div>
          <div>
            <h4 className="font-bold text-lg">${item.title}</h4>
            ${item.description && html`<p className="text-sm text-white/40">${item.description}</p>`}
          </div>
        </div>
        <${Download} size=${20} className="text-white/20 group-hover:text-brand-accent transition-colors" />
      </a>
    </${motion.div}>
  `;
};

const PreviewModal = ({ item, onClose }) => {
  const getPreviewUrl = (url) => {
    if (url.includes('drive.google.com')) {
      return url.replace(/\/view.*$/, '/preview');
    }
    return url;
  };

  return html`
    <${motion.div} 
      initial=${{ opacity: 0 }}
      animate=${{ opacity: 1 }}
      exit=${{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick=${onClose} />
      <${motion.div} 
        initial=${{ scale: 0.95, opacity: 0, y: 20 }}
        animate=${{ scale: 1, opacity: 1, y: 0 }}
        exit=${{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full h-full max-w-6xl bg-brand-bg rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-2xl"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div>
            <h3 className="text-xl font-bold tracking-tight">${item.title}</h3>
            <p className="text-sm text-white/40 italic">${item.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href=${item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm font-medium flex items-center gap-2"
            >
              Open in Drive <${LinkIcon} size=${14} />
            </a>
            <button 
              onClick=${onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-accent hover:text-black transition-all flex items-center justify-center"
            >
              <${ChevronRight} size=${24} className="rotate-90 md:rotate-0" />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-black/20">
          <iframe 
            src=${getPreviewUrl(item.url)} 
            className="w-full h-full border-none"
            allow="autoplay"
          />
        </div>
      </${motion.div}>
    </${motion.div}>
  `;
};

const ChapterItem = ({ chapter, subjectId, isExpanded, onToggle }) => {
  const Icon = chapter.icon;

  return html`
    <${motion.div}
      initial=${{ opacity: 0, y: 20 }}
      whileInView=${{ opacity: 1, y: 0 }}
      viewport=${{ once: true }}
      transition=${{ duration: 0.5 }}
      className="glass rounded-3xl overflow-hidden transition-all duration-300"
    >
      <button 
        onClick=${onToggle}
        className="w-full p-8 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
      >
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
            <${Icon} size=${24} />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight">${chapter.title}</h3>
        </div>
        <${motion.div}
          animate=${{ rotate: isExpanded ? 90 : 0 }}
          className="text-white/30"
        >
          <${ChevronRight} size=${24} />
        </${motion.div}>
      </button>

      <${AnimatePresence}>
        ${isExpanded && html`
          <${motion.div}
            key="content"
            initial=${{ height: 0, opacity: 0 }}
            animate=${{ height: 'auto', opacity: 1 }}
            exit=${{ height: 0, opacity: 0 }}
            transition=${{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-8 pb-8 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              ${chapter.subChapters.map((sub) => html`
                <${Link} 
                  key=${sub.id}
                  href=${`/notes/${subjectId}/${chapter.id}/${sub.id}`}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-accent/30 hover:bg-white/10 transition-all group flex items-center justify-between"
                >
                  <span className="font-medium text-white/80 group-hover:text-white transition-colors">${sub.title}</span>
                  <${ChevronRight} size=${16} className="text-white/20 group-hover:text-brand-accent transition-colors" />
                </${Link}>
              `)}
            </div>
          </${motion.div}>
        `}
      </${AnimatePresence}>
    </${motion.div}>
  `;
};
