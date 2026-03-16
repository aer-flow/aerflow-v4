import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MagneticButton from '../ui/MagneticButton';
import VerticalParallax from '../ui/VerticalParallax';
import { useCursorStore } from '@/store/useCursorStore';

gsap.registerPlugin(ScrollTrigger);

export default function FinalMonolith() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  
  const setCursorVariant = useCursorStore((state) => state.setCursorVariant);

  // Optimized mouse tracking using MotionValues and Springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || window.innerWidth < 768) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate coordinates relative to the section container
    // This handles the transform-gpu containing block issue
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !manifestoRef.current || !actionsRef.current) return;

    const letters = textRef.current.children;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=100%" : "+=150%", 
          pin: !isMobile,
          scrub: 0.5,
        }
      });

      // Cinematic, slow reveal
      tl.fromTo(letters,
        { 
          opacity: 0, 
          scale: 0.8,
          y: 50
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          duration: 1.5,
          ease: "expo.out",
        }
      )
      // Reveal Manifesto Subtext
      .fromTo(manifestoRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 
        "-=0.8"
      )
      // Reveal Actions
      .fromTo(actionsRef.current, 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.2)" }, 
        "-=0.7"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBackToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, {
        duration: 2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const aerflowText = "AERFLOW".split("");

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-[#020202] flex flex-col justify-center items-center overflow-hidden border-t border-white/10 z-50 transform-gpu"
    >
      
      {/* 1. Ambient Spotlight (Absolute Positioning relative to section) */}
      <motion.div 
        className="absolute top-0 left-0 rounded-full pointer-events-none will-change-transform"
        style={{
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(215,255,107,0.08) 0%, rgba(0,0,0,0) 70%)',
          x: smoothX,
          y: smoothY,
          left: 0,
          top: 0,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 0
        }}
      />

      {/* 2. Removed Local Noise - handled by global overlay */}

      {/* 3. The Background Echo Marquee */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center overflow-hidden pointer-events-none opacity-[0.015]">
        <motion.div 
          animate={{ x: [0, -2000] }} 
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="whitespace-nowrap text-[15vw] font-black uppercase tracking-tighter text-white will-change-transform"
        >
          INNOVATION • DISRUPTION • CREATIVITY • INNOVATION • DISRUPTION • CREATIVITY •
        </motion.div>
      </div>

      {/* 4. Grid Details */}
      <VerticalParallax speed={1.15} className="absolute top-24 left-8 md:top-10 md:left-10 z-10">
        <div className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-aerflow-gray/60 uppercase pointer-events-none">
          [ BUCUREȘTI, RO ]<br/>
          44.4268° N, 26.1025° E
        </div>
      </VerticalParallax>
      <VerticalParallax speed={1.15} className="absolute top-36 left-8 md:top-10 md:right-10 md:left-auto z-10">
        <div className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-aerflow-accent/80 uppercase text-left md:text-right flex items-center justify-start md:justify-end gap-3 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-aerflow-accent animate-pulse" />
            [ DISPONIBIL PENTRU PROIECTE ]
          </div>
        </div>
      </VerticalParallax>

      {/* 5. Main Content Area */}
      <div className="flex flex-col items-center justify-center z-10 w-full max-w-screen-2xl px-8 mt-56 md:mt-20">
        
        {/* AERFLOW Monumental Text */}
        <h2 
          ref={textRef} 
          className="text-[clamp(4rem,18vw,22rem)] font-black uppercase tracking-tighter leading-none text-aerflow-light flex"
        >
          {aerflowText.map((letter, i) => (
            <span key={i} className="inline-block will-change-transform">
              {letter}
            </span>
          ))}
        </h2>

        {/* The Manifesto Subtext */}
        <VerticalParallax speed={0.85} className="mt-8 text-center max-w-3xl">
          <div ref={manifestoRef}>
            <p className="text-lg md:text-2xl font-serif italic text-aerflow-gray leading-relaxed">
              "Am ajuns la marginea ecranului.<br/>Dar acesta este doar începutul. Nu scriem doar cod,{'\n'}
              <br/><span className="text-aerflow-light not-italic font-sans font-bold">scriem istoria digitală a brandului tău.</span>"
            </p>
          </div>
        </VerticalParallax>

        {/* Dual Actions */}
        <div 
          ref={actionsRef}
          className="mt-20 z-20 flex flex-col md:flex-row gap-8 items-center"
        >
          <MagneticButton>
            <Link 
              to="/contact" 
              className="px-8 py-4 rounded-full bg-aerflow-accent text-aerflow-dark font-sans font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors duration-500 block"
              onMouseEnter={() => setCursorVariant('project', 'CLICK')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              Să Începem
            </Link>
          </MagneticButton>

          <MagneticButton>
            <button 
              onClick={handleBackToTop}
              className="group flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-aerflow-gray hover:text-aerflow-light transition-colors duration-500 uppercase bg-transparent border-none outline-none"
              onMouseEnter={() => setCursorVariant('project', 'SUS')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              [ ↑ Începe din nou ]
              <span className="w-8 h-[1px] bg-aerflow-gray group-hover:bg-aerflow-light transition-colors duration-500" />
            </button>
          </MagneticButton>
        </div>

      </div>

    </section>
  );
}

