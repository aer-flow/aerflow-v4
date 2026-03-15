import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MagneticButton from '../ui/MagneticButton';
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
    if (!containerRef.current) return;
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", 
          pin: true,
          scrub: 0.5,
        }
      });

      // Cinematic, slow reveal
      tl.fromTo(letters,
        { 
          opacity: 0, 
          filter: "blur(12px)", 
          x: (i) => (i - 3) * 100,
          scale: 1.2
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          x: 0,
          scale: 1,
          stagger: 0.15, // Significantly increased for a slower feel
          duration: 2.5, // Significantly increased for a slower feel
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
        className="absolute top-0 left-0 rounded-full pointer-events-none mix-blend-screen will-change-transform"
        style={{
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(215,255,107,0.1) 0%, rgba(0,0,0,0) 70%)',
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 0
        }}
      />

      {/* 2. Global Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* 3. The Background Echo Marquee */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center overflow-hidden pointer-events-none opacity-[0.015]">
        <motion.div 
          animate={{ x: [0, -2000] }} 
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="whitespace-nowrap text-[15vw] font-black uppercase tracking-tighter text-white"
        >
          INNOVATION • DISRUPTION • CREATIVITY • INNOVATION • DISRUPTION • CREATIVITY •
        </motion.div>
      </div>

      {/* 4. Grid Details */}
      <div className="absolute top-10 left-10 z-10 font-mono text-[10px] tracking-[0.3em] text-aerflow-gray/60 uppercase">
        [ BUCUREȘTI, RO ]<br/>
        44.4268° N, 26.1025° E
      </div>
      <div className="absolute top-10 right-10 z-10 font-mono text-[10px] tracking-[0.3em] text-aerflow-accent/80 uppercase text-right flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-aerflow-accent animate-pulse" />[ DISPONIBIL PENTRU PROIECTE ]
      </div>

      {/* 5. Main Content Area */}
      <div className="flex flex-col items-center justify-center z-10 w-full max-w-screen-2xl px-8">
        
        {/* AERFLOW Monumental Text */}
        <h2 
          ref={textRef} 
          className="text-[clamp(4rem,18vw,22rem)] font-black uppercase tracking-tighter leading-none text-aerflow-light flex"
        >
          {aerflowText.map((letter, i) => (
            <span key={i} className="inline-block will-change-[transform,opacity,filter]">
              {letter}
            </span>
          ))}
        </h2>

        {/* The Manifesto Subtext */}
        <div ref={manifestoRef} className="mt-8 text-center max-w-3xl">
          <p className="text-lg md:text-2xl font-serif italic text-aerflow-gray leading-relaxed">
            "Am ajuns la marginea ecranului.<br/>Dar acesta este doar începutul. Nu scriem doar cod,<br/><span className="text-aerflow-light not-italic font-sans font-bold">scriem istoria digitală a brandului tău.</span>"
          </p>
        </div>

        {/* Dual Actions */}
        <div 
          ref={actionsRef}
          className="mt-20 z-20 flex flex-col md:flex-row gap-8 items-center"
        >
          <MagneticButton>
            <Link 
              to="/contact" 
              className="px-8 py-4 rounded-full bg-aerflow-accent text-aerflow-dark font-sans font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors duration-500"
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

