import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const columns = 5;

const expandVariants = {
  initial: { top: 0 },
  enter: (i: number) => ({
    top: "100%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.05 * i },
  }),
  exit: (i: number) => ({
    top: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.05 * i },
  }),
};

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full h-full bg-aerflow-dark">
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
      
      <div className="fixed inset-0 pointer-events-none z-[100] flex w-full h-screen">
        {[...Array(columns)].map((_, i) => (
          <motion.div
            key={i}
            custom={columns - i}
            variants={expandVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="h-full w-full bg-aerflow-dark relative"
          />
        ))}
      </div>
    </div>
  );
}
