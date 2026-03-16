import { BookOpen, Zap, Wind, Cpu, Atom, Globe } from 'lucide-react';

export interface SubChapter {
  id: string;
  title: string;
  notes: string;
  downloadUrl: string;
}

export interface Chapter {
  id: string;
  title: string;
  icon: any;
  subChapters: SubChapter[];
}

export interface Subject {
  id: string;
  title: string;
  code: string;
  chapters: Chapter[];
}

export const PHYSICS_CURRICULUM: Subject = {
  id: 'physics',
  title: 'Physics',
  code: '0625 / 0972',
  chapters: [
    {
      id: 'motion-forces-energy',
      title: '1. Motion, Forces & Energy',
      icon: Zap,
      subChapters: [
        { id: 'measurement', title: 'Physical Quantities & Measurement Techniques', notes: 'Detailed notes on SI units, measurement tools like vernier calipers and micrometers...', downloadUrl: '#' },
        { id: 'motion', title: 'Motion', notes: 'Speed, velocity, acceleration, and distance-time graphs...', downloadUrl: '#' },
        { id: 'mass-density', title: 'Mass, Weight & Density', notes: 'Understanding the difference between mass and weight, and calculating density...', downloadUrl: '#' },
        { id: 'forces', title: 'Effects of Forces', notes: 'Hooke\'s Law, resultant forces, and Newton\'s laws of motion...', downloadUrl: '#' },
        { id: 'moments', title: 'Moments', notes: 'Turning effect of forces and the principle of moments...', downloadUrl: '#' },
        { id: 'momentum', title: 'Momentum', notes: 'Conservation of momentum and impulse...', downloadUrl: '#' },
        { id: 'energy-work-power', title: 'Energy, Work & Power', notes: 'Kinetic energy, potential energy, work done, and power calculations...', downloadUrl: '#' },
        { id: 'energy-sources', title: 'Energy Sources', notes: 'Renewable and non-renewable energy resources...', downloadUrl: '#' },
        { id: 'pressure', title: 'Pressure', notes: 'Pressure in solids, liquids, and gases...', downloadUrl: '#' },
      ]
    },
    {
      id: 'thermal-physics',
      title: '2. Thermal Physics',
      icon: Wind,
      subChapters: [
        { id: 'kinetic-model', title: 'Kinetic Particle and Model of Matter', notes: 'States of matter, Brownian motion, and evaporation...', downloadUrl: '#' },
        { id: 'thermal-properties', title: 'Thermal Properties & Temperatures', notes: 'Thermal expansion, specific heat capacity, and latent heat...', downloadUrl: '#' },
        { id: 'transfer-thermal', title: 'Transfer of Thermal Energy', notes: 'Conduction, convection, and radiation...', downloadUrl: '#' },
      ]
    },
    {
      id: 'waves',
      title: '3. Waves',
      icon: BookOpen,
      subChapters: [
        { id: 'general-waves', title: 'General Properties of Waves', notes: 'Transverse and longitudinal waves, frequency, wavelength, and amplitude...', downloadUrl: '#' },
        { id: 'light', title: 'Light', notes: 'Reflection, refraction, and total internal reflection...', downloadUrl: '#' },
        { id: 'em-spectrum', title: 'Electromagnetic Spectrum', notes: 'Properties and uses of EM waves from radio to gamma rays...', downloadUrl: '#' },
        { id: 'sound', title: 'Sound', notes: 'Production and transmission of sound waves...', downloadUrl: '#' },
      ]
    },
    {
      id: 'electricity-magnetism',
      title: '4. Electricity & Magnetism',
      icon: Cpu,
      subChapters: [
        { id: 'magnetism', title: 'Simple Phenomena of Magnetism', notes: 'Magnetic fields, permanent magnets, and electromagnets...', downloadUrl: '#' },
        { id: 'electrical-quantities', title: 'Electrical Quantities', notes: 'Current, voltage, resistance, and Ohm\'s Law...', downloadUrl: '#' },
        { id: 'circuits-safety', title: 'Electric Circuits & Electrical Safety', notes: 'Series and parallel circuits, fuses, and earthing...', downloadUrl: '#' },
        { id: 'em-effects', title: 'Electromagnetic Effects', notes: 'Electromagnetic induction, AC generators, and transformers...', downloadUrl: '#' },
      ]
    },
    {
      id: 'nuclear-physics',
      title: '5. Nuclear Physics',
      icon: Atom,
      subChapters: [
        { id: 'nuclear-model', title: 'The Nuclear Model of the Atom', notes: 'Atomic structure, protons, neutrons, and electrons...', downloadUrl: '#' },
        { id: 'radioactivity', title: 'Radioactivity', notes: 'Alpha, beta, and gamma decay, half-life, and safety...', downloadUrl: '#' },
      ]
    },
    {
      id: 'space-physics',
      title: '6. Space Physics',
      icon: Globe,
      subChapters: [
        { id: 'solar-system', title: 'Earth & The Solar system', notes: 'Orbits, seasons, and the components of our solar system...', downloadUrl: '#' },
        { id: 'stars-universe', title: 'Stars & the Universe', notes: 'Life cycle of stars, galaxies, and the Big Bang theory...', downloadUrl: '#' },
      ]
    }
  ]
};
