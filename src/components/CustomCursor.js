import { useEffect, useState, html } from '../lib/preact.js';
import { motion, useSpring, useMotionValue } from 'https://esm.sh/framer-motion?alias=react:preact/compat,react-dom:preact/compat';
import cursorImg from '../../cursor.png';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for that "floaty" feel
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible && !isHovering) return null;

  return html`
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <${motion.div}
        style=${{
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          scale: isClicked ? 0.9 : (isHovering ? 1.2 : 1),
        }}
        className="absolute"
      >
        <img 
          src=${cursorImg} 
          alt="Custom Cursor" 
          className="w-8 h-8 object-contain"
          style=${{
            filter: 'drop-shadow(0 0 2px #0ACF83) drop-shadow(0 0 4px rgba(10, 207, 131, 0.6))'
          }}
          referrerPolicy="no-referrer"
        />
      </${motion.div}>
    </div>
  `;
};
