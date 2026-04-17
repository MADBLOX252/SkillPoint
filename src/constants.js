export const PHYSICS_IGCSE = {
  id: 'physics-igcse',
  title: 'Physics',
  code: '0625 / 0972',
  category: 'IGCSE',
  notes: [
    {
      id: 'forces',
      title: 'Forces & Motion',
      subChapters: [
        {
          id: 'speed-velocity-acceleration',
          title: 'Speed, Velocity & Acceleration',
          downloadUrl: '#',
          content: [
            { type: 'heading', content: 'Understanding Motion' },
            { type: 'text', content: 'Speed is the distance travelled per unit time. Velocity is speed in a given direction.' },
            { type: 'image', url: 'https://picsum.photos/seed/physics1/800/400', caption: 'Motion diagrams' }
          ]
        }
      ]
    }
  ],
  topicalQuestions: [],
  textbooks: [],
  resources: []
};

export const PHYSICS_AL = {
  id: 'physics-al',
  title: 'Physics',
  code: '9702',
  category: 'A-Level',
  notes: [],
  noteResources: [
    { id: 'al-physics-combined-1', title: 'Combined Chapters Notes - 1', url: 'https://drive.google.com/file/d/1KFgAoEAbd7r-LcW9cjU36xN5L1j8HqWa/view?usp=sharing', type: 'pdf', category: 'Combined Chapters Notes' },
    { id: 'al-physics-defs-1', title: 'Definitions - 1', url: 'https://drive.google.com/file/d/1CuMRZSjamPZ6-OoM5CiE9c4KS6W5c7SK/view?usp=sharing', type: 'pdf', category: 'Definitions' }
  ],
  topicalQuestions: [],
  textbooks: [
    { id: 'al-physics-revision-guide', title: 'Revision Guide', description: 'Richard Woodside', url: '#', type: 'pdf' }
  ],
  resources: []
};

export const MATH_IGCSE = { id: 'math-igcse', title: 'Mathematics', code: '0580 & 0980', category: 'IGCSE', notes: [], topicalQuestions: [], textbooks: [], resources: [] };
export const BIOLOGY_IGCSE = { id: 'biology-igcse', title: 'Biology', code: '0610 & 0970', category: 'IGCSE', notes: [], topicalQuestions: [], textbooks: [], resources: [] };
export const CHEMISTRY_IGCSE = { id: 'chemistry-igcse', title: 'Chemistry', code: '0610 & 0971', category: 'IGCSE', notes: [], topicalQuestions: [], textbooks: [], resources: [] };
export const ICT_IGCSE = { id: 'ict-igcse', title: 'ICT', code: '0417', category: 'IGCSE', notes: [], topicalQuestions: [], textbooks: [], resources: [] };
export const CHEMISTRY_AL = { id: 'chemistry-al', title: 'Chemistry', code: '9701', category: 'A-Level', notes: [], topicalQuestions: [], textbooks: [], resources: [] };
export const BIOLOGY_AL = { id: 'biology-al', title: 'Biology', code: '9700', category: 'A-Level', notes: [], topicalQuestions: [], textbooks: [], resources: [] };
export const IT_AL = { id: 'it-al', title: 'IT', code: '9626', category: 'A-Level', notes: [], topicalQuestions: [], textbooks: [], resources: [] };
export const MATH_AL = { id: 'math-al', title: 'Mathematics', code: '9709', category: 'A-Level', notes: [], topicalQuestions: [], textbooks: [], resources: [] };

export const CURRICULUM_DATA = {
  'physics-igcse': PHYSICS_IGCSE,
  'math-igcse': MATH_IGCSE,
  'biology-igcse': BIOLOGY_IGCSE,
  'chemistry-igcse': CHEMISTRY_IGCSE,
  'ict-igcse': ICT_IGCSE,
  'chemistry-al': CHEMISTRY_AL,
  'biology-al': BIOLOGY_AL,
  'physics-al': PHYSICS_AL,
  'it-al': IT_AL,
  'math-al': MATH_AL,
};

export const SUBJECTS_LIST = [
  { id: 'math-igcse', title: 'Mathematics', code: '0580 & 0980', category: 'IGCSE', icon: 'calculator' },
  { id: 'biology-igcse', title: 'Biology', code: '0610 & 0970', category: 'IGCSE', icon: 'dna' },
  { id: 'chemistry-igcse', title: 'Chemistry', code: '0610 & 0971', category: 'IGCSE', icon: 'flask-conical' },
  { id: 'ict-igcse', title: 'ICT', code: '0417', category: 'IGCSE', icon: 'monitor' },
  { id: 'physics-igcse', title: 'Physics', code: '0625 / 0972', category: 'IGCSE', icon: 'zap' },
  { id: 'chemistry-al', title: 'Chemistry', code: '9701', category: 'A-Level', icon: 'flask-conical' },
  { id: 'biology-al', title: 'Biology', code: '9700', category: 'A-Level', icon: 'dna' },
  { id: 'physics-al', title: 'Physics', code: '9702', category: 'A-Level', icon: 'zap' },
  { id: 'it-al', title: 'IT', code: '9626', category: 'A-Level', icon: 'database' },
  { id: 'math-al', title: 'Mathematics', code: '9709', category: 'A-Level', icon: 'calculator' },
];
