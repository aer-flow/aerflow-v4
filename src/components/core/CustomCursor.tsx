import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursorStore } from '@/store/useCursorStore';

export default function CustomCursor() {
  const { variant, text } = useCursorStore();
  const [isVisible, setIsVisible] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Initial check
    setIsVisible(true);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: '#F2F2F2',
      boxShadow: '0 0 10px rgba(255,255,255,0.3)',
      opacity: 1,
    },
    project: {
      width: 150,
      height: 150,
      backgroundColor: '#D7FF6B',
      opacity: 1,
    },
    menu: {
      width: 60,
      height: 60,
      backgroundColor: '#F2F2F2',
      opacity: 1,
    },
    hidden: {
      width: 0,
      height: 0,
      opacity: 0,
    }
  };

  if (typeof window === 'undefined') return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none flex items-center justify-center overflow-hidden"
      style={{
        left: smoothX,
        top: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        willChange: "transform",
      }}
      initial="hidden"
      animate={isVisible ? variant : "hidden"}
      variants={variants}
      transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
    >
      {variant === 'project' && (
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-aerflow-dark font-sans font-bold text-sm tracking-widest"
        >
          {text || 'VEZI'}
        </motion.span>
      )}
    </motion.div>
  );
}
