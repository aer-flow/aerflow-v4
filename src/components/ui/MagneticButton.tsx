import { useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticButton({ children, className }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // High-performance MotionValues to bypass React render cycle
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the magnetic effect
  const springConfig = { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Cached dimensions to prevent layout thrashing (getBoundingClientRect) on every move
  const rectRef = useRef<{ width: number; height: number; left: number; top: number } | null>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = rectRef.current;
    
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    x.set(middleX * 0.4);
    y.set(middleY * 0.4);
  }, [x, y]);

  const reset = () => {
    x.set(0);
    y.set(0);
    rectRef.current = null;
  };

  return (
    <motion.div
      style={{ 
        position: 'relative',
        x: smoothX,
        y: smoothY,
        willChange: 'transform'
      }}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={className}
    >
      <motion.div
        style={{
          x: useSpring(x, { ...springConfig, stiffness: 100 }), // Slightly delayed inner element
          y: useSpring(y, { ...springConfig, stiffness: 100 }),
          willChange: 'transform'
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
