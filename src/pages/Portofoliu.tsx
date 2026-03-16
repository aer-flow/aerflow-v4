import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PageTransition from '@/components/core/PageTransition';
import VerticalParallax from '@/components/ui/VerticalParallax';
import { useCursorStore } from '@/store/useCursorStore';

const works = [
  { title: "NEXUS", client: "FINTECH", year: "2024", img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2564" },
  { title: "AURA", client: "LIFESTYLE", year: "2023", img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2564" },
  { title: "KINETIC", client: "AUTO", year: "2023", img: "https://images.unsplash.com/photo-1503376712341-ea4dfb4c7302?q=80&w=2564" },
  { title: "SYLVA", client: "ARHITECTURĂ", year: "2022", img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2564" }
];

export default function Portofoliu() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const setCursorVariant = useCursorStore((state: any) => state.setCursorVariant);

  return (
    <PageTransition>
      <div className="relative w-full min-h-screen bg-aerflow-dark pt-40 pb-20 px-8">
        {/* Global Background Reveal */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              key="bg-reveal"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-0 pointer-events-none"
            >
              <img 
                src={works[hoveredIndex].img} 
                alt="" 
                className="w-full h-full object-cover grayscale opacity-50"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 max-w-screen-2xl mx-auto">
          <VerticalParallax speed={1.15}>
            <h1 className="text-sm font-mono tracking-widest mb-20 text-aerflow-gray">[ ARCHIVA NOASTRĂ ]</h1>
          </VerticalParallax>

          <div className="w-full border-t border-white/20">
            {works.map((work, i) => (
              <div 
                key={i}
                onMouseEnter={() => {
                  setHoveredIndex(i);
                  setCursorVariant('project', 'VEZI');
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setCursorVariant('default');
                }}
                className={`w-full group py-12 border-b border-white/20 flex flex-col md:flex-row items-start md:items-center justify-between cursor-none transition-opacity duration-500 ${hoveredIndex !== null && hoveredIndex !== i ? 'opacity-20' : 'opacity-100'}`}
              >
                <VerticalParallax speed={1.25}>
                  <div className="text-[clamp(3rem,6vw,8rem)] font-sans font-black leading-none uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500 ease-awwwards">
                    {work.title}
                  </div>
                </VerticalParallax>
                
                <VerticalParallax speed={1.1} className="flex gap-12 mt-4 md:mt-0 font-mono text-sm tracking-widest text-aerflow-gray">
                  <span>{work.client}</span>
                  <span>{work.year}</span>
                </VerticalParallax>

                <div className="hidden md:block opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all duration-500 ease-awwwards">
                  <ArrowUpRight size={48} className="text-aerflow-accent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
