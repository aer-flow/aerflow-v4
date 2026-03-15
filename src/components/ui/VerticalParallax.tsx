import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface VerticalParallaxProps {
  children: React.ReactNode;
  offset?: number; // How much it moves (positive or negative)
  className?: string;
}

export default function VerticalParallax({ 
  children, 
  offset = 80, // Slightly more visible default
  className = "" 
}: VerticalParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yValue = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const y = useSpring(yValue, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
