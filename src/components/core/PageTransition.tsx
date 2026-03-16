import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { shouldReduceMotion } from '@/utils/device';

const columns = 5;
const pageEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

const expandVariants = {
  initial: { top: 0 },
  enter: (i: number) => ({
    top: "100%",
    transition: { duration: 0.8, ease: pageEase, delay: 0.05 * i },
  }),
  exit: (i: number) => ({
    top: 0,
    transition: { duration: 0.8, ease: pageEase, delay: 0.05 * i },
  }),
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const reduceMotion = shouldReduceMotion();

  return (
    <div className="relative w-full h-full bg-aerflow-dark">
      <motion.div 
        initial={reduceMotion ? false : { y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transitionEnd: { transform: "none" } }}
        exit={reduceMotion ? { opacity: 0 } : { y: -40, opacity: 0 }}
        transition={reduceMotion ? { duration: 0.2 } : { duration: 0.8, ease: pageEase, delay: 0.2 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
      
      {!reduceMotion && (
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
      )}
    </div>
  );
}
