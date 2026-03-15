import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface VerticalParallaxProps {
  children: React.ReactNode;
  offset?: number; 
  className?: string;
}

export default function VerticalParallax({ 
  children, 
  offset = 80, 
  className = "" 
}: VerticalParallaxProps) {
  const ref = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yValue = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  
  // Use a very light spring or direct transform on mobile
  const y = useSpring(yValue, isMobile ? {
    stiffness: 300,
    damping: 50,
    mass: 0.1,
    restDelta: 0.01
  } : {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      ref={ref} 
      style={{ y, willChange: "transform" }} 
      className={className}
    >
      {children}
    </motion.div>
  );
}
