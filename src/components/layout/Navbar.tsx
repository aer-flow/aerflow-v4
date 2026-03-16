import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import MagneticButton from '../ui/MagneticButton';
import GlitchText from '../ui/GlitchText';
import VerticalParallax from '../ui/VerticalParallax';
import { useCursorStore, type CursorState } from '@/store/useCursorStore';

const links = [
  { title: "ACASĂ", path: "/" },
  { title: "PORTOFOLIU", path: "/portofoliu" },
  { title: "SERVICII", path: "/servicii" },
  { title: "CONTACT", path: "/contact" }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const setCursorVariant = useCursorStore((state: CursorState) => state.setCursorVariant);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-[900] bg-[rgba(7,7,7,0.82)] border-b border-white/5 text-aerflow-light">
        <VerticalParallax speed={1.18} intensity={0.9} global className="z-[1000]">
          <Link to="/" className="text-xl font-mono font-bold tracking-widest">
            [ <GlitchText text="AERFLOW" /> ]
          </Link>
        </VerticalParallax>

        <VerticalParallax speed={1.3} intensity={0.95} global className="z-[1000]">
          <div 
            className="cursor-none"
            onMouseEnter={() => setCursorVariant('menu')}
            onMouseLeave={() => setCursorVariant('default')}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MagneticButton>
              <div className="text-sm font-sans font-bold tracking-widest uppercase hover:text-aerflow-accent transition-colors">
                [ {menuOpen ? 'ÎNCHIDE' : 'MENIU'} ]
              </div>
            </MagneticButton>
          </div>
        </VerticalParallax>
      </nav>

      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-aerflow-dark z-[800] flex flex-col justify-center items-center"
          >
            <div className="flex flex-col space-y-4 text-center">
              {links.map((link, i) => (
                <VerticalParallax
                  key={i}
                  speed={1.45 + i * 0.12}
                  intensity={1.05}
                  global
                  className="overflow-hidden relative group"
                >
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Link 
                      to={link.path} 
                      onClick={() => setMenuOpen(false)}
                      className="text-[clamp(3rem,8vw,8rem)] font-sans font-black leading-none text-aerflow-light relative inline-block"
                    >
                      <span className="relative z-10 group-hover:text-transparent transition-colors duration-500">
                        {link.title}
                      </span>
                      <span className="absolute inset-0 font-serif italic text-aerflow-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
                        {link.title}
                      </span>
                    </Link>
                  </motion.div>
                </VerticalParallax>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
