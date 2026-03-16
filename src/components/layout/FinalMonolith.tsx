import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MagneticButton from '../ui/MagneticButton';
import VerticalParallax from '../ui/VerticalParallax';
import { useCursorStore } from '@/store/useCursorStore';
import { isMobileViewport, shouldReduceMotion, shouldUseLiteEffects } from '@/utils/device';

gsap.registerPlugin(ScrollTrigger);
type WindowWithLenis = Window & {
  lenis?: {
    scrollTo: (target: number, options?: { duration?: number; easing?: (t: number) => number }) => void;
  } | null;
};

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
  const boundsRef = useRef<DOMRect | null>(null);
  const updateBounds = () => {
    boundsRef.current = containerRef.current?.getBoundingClientRect() ?? null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boundsRef.current || shouldUseLiteEffects()) return;
    mouseX.set(e.clientX - boundsRef.current.left);
    mouseY.set(e.clientY - boundsRef.current.top);
  };

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !manifestoRef.current || !actionsRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = isMobileViewport();
      const reduceMotion = shouldReduceMotion();
      const scrubAmount = reduceMotion ? false : isMobile ? 1 : 0.7;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "bottom bottom" : "+=200%",
          pin: isMobile ? false : true,
          pinType: "fixed",
          scrub: scrubAmount,
          invalidateOnRefresh: true,
        }
      });

      const textNode = textRef.current;
      if (!textNode) return;

      tl.fromTo(textNode.children,
        { 
          opacity: 0, 
          scale: 0.92,
          y: 30
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: reduceMotion ? 0.03 : 0.06,
          duration: reduceMotion ? 0.8 : 1.1,
          ease: "power3.out",
        }
      )
      .fromTo(manifestoRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: reduceMotion ? 0.7 : 0.9, ease: "power3.out" }, 
        "-=0.5"
      )
      .fromTo(actionsRef.current, 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: reduceMotion ? 0.7 : 0.9, ease: "power3.out" }, 
        "-=0.45"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!containerRef.current || shouldUseLiteEffects()) return;

    updateBounds();
    window.addEventListener('resize', updateBounds, { passive: true });

    return () => {
      window.removeEventListener('resize', updateBounds);
    };
  }, []);

  const handleBackToTop = () => {
    if ((window as WindowWithLenis).lenis) {
      (window as WindowWithLenis).lenis?.scrollTo(0, {
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
      onMouseEnter={updateBounds}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[220svh] md:h-screen bg-[#020202] border-t border-white/10 z-50 transition-colors duration-1000"
    >
      {/* 0. Sticky Wrapper for Mobile Content */}
      <div className="sticky top-0 w-full h-[100svh] md:h-screen overflow-hidden">
        
        {/* 1. Ambient Spotlight — desktop only */}
        {!shouldUseLiteEffects() && (
          <motion.div 
            className="absolute top-0 left-0 rounded-full pointer-events-none"
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
        )}

        {/* 3. The Background Echo Marquee — desktop only */}
        {!shouldUseLiteEffects() && (
          <div className="absolute inset-0 z-0 flex flex-col justify-center overflow-hidden pointer-events-none opacity-[0.015]">
            <motion.div 
              animate={{ x: [0, -2000] }} 
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              className="whitespace-nowrap text-[15vw] font-black uppercase tracking-tighter text-white"
            >
              INNOVATION • DISRUPTION • CREATIVITY • INNOVATION • DISRUPTION • CREATIVITY •
            </motion.div>
          </div>
        )}

        {/* 4. Grid Details */}
        <VerticalParallax speed={1.3} disabledOnMobile className="absolute top-32 left-8 z-10 hidden md:block">
          <div className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-aerflow-gray/60 uppercase pointer-events-none">
            [ BUCUREȘTI, RO ]<br/>
            44.4268° N, 26.1025° E
          </div>
        </VerticalParallax>
        <VerticalParallax speed={1.3} disabledOnMobile className="absolute top-[11rem] left-8 z-10 hidden md:block">
          <div className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-aerflow-accent/80 uppercase text-left flex items-center justify-start gap-3 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-aerflow-accent animate-pulse" />
              [ DISPONIBIL PENTRU PROIECTE ]
            </div>
          </div>
        </VerticalParallax>

        {/* 5. Main Content Area */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-start px-6 pt-24 pb-10 md:justify-center md:px-8 md:pt-0 md:pb-0">
          <div className="flex w-full max-w-screen-2xl flex-col items-center md:mt-40">
            <div className="mb-10 flex w-full max-w-md flex-col gap-4 self-start md:hidden">
              <div className="font-mono text-[10px] tracking-[0.22em] text-aerflow-gray/60 uppercase">
                [ BUCUREȘTI, RO ]<br />
                44.4268° N, 26.1025° E
              </div>
              <div className="font-mono text-[10px] tracking-[0.22em] text-aerflow-accent/80 uppercase">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-aerflow-accent animate-pulse" />
                  [ DISPONIBIL PENTRU PROIECTE ]
                </div>
              </div>
            </div>
          
            {/* AERFLOW Monumental Text */}
            <VerticalParallax speed={1.7} intensity={1.1} triggerRef={containerRef} disabledOnMobile>
              <h2 
                ref={textRef} 
                className="flex w-full justify-center text-center text-[clamp(3.15rem,16vw,20rem)] font-black uppercase tracking-[-0.05em] leading-[0.9] text-aerflow-light md:text-[clamp(4rem,15vw,20rem)] md:tracking-tighter md:leading-none"
              >
                {aerflowText.map((letter, i) => (
                  <span key={i} className="inline-block will-change-transform opacity-0">
                    {letter}
                  </span>
                ))}
              </h2>
            </VerticalParallax>

            {/* The Manifesto Subtext */}
            <VerticalParallax speed={1.38} intensity={1.05} triggerRef={containerRef} disabledOnMobile>
              <div ref={manifestoRef} className="mt-6 max-w-[34rem] text-center md:mt-8 md:max-w-3xl">
                <p className="text-base leading-relaxed text-aerflow-gray md:text-2xl">
                  <span className="font-serif italic">
                    "Am ajuns la marginea ecranului.<br />Dar acesta este doar începutul. Nu scriem doar cod,
                  </span>
                  <br />
                  <span className="font-sans font-bold text-aerflow-light">scriem istoria digitală a brandului tău."</span>
                </p>
              </div>
            </VerticalParallax>

            {/* Dual Actions */}
            <VerticalParallax speed={1.52} intensity={1.08} triggerRef={containerRef} disabledOnMobile>
              <div 
                ref={actionsRef}
                className="mt-10 z-20 flex flex-col items-center gap-5 md:mt-20 md:flex-row md:gap-8"
              >
                <MagneticButton>
                  <Link 
                    to="/contact" 
                    className="block rounded-full bg-aerflow-accent px-8 py-4 text-sm font-sans font-bold uppercase tracking-widest text-aerflow-dark transition-colors duration-500 hover:bg-white"
                    onMouseEnter={() => setCursorVariant('project', 'CLICK')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    Să Începem
                  </Link>
                </MagneticButton>

                <MagneticButton>
                  <button 
                    onClick={handleBackToTop}
                    className="group flex items-center gap-3 bg-transparent font-mono text-[10px] tracking-[0.2em] text-aerflow-gray uppercase outline-none transition-colors duration-500 hover:text-aerflow-light"
                    onMouseEnter={() => setCursorVariant('project', 'SUS')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    [ ↑ Începe din nou ]
                    <span className="h-[1px] w-8 bg-aerflow-gray transition-colors duration-500 group-hover:bg-aerflow-light" />
                  </button>
                </MagneticButton>
              </div>
            </VerticalParallax>
          </div>
        </div>
      </div>
    </section>
  );
}
