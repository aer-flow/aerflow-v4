import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import HeroCanvas from '@/components/webgl/HeroCanvas';
import PageTransition from '@/components/core/PageTransition';
import ServicesStack from '@/components/layout/ServicesStack';
import FinalMonolith from '@/components/layout/FinalMonolith';
import ParallaxImage from '@/components/ui/ParallaxImage';
import FloatingElements from '@/components/ui/FloatingElements';
import ParallaxText from '@/components/ui/ParallaxText';
import VerticalParallax from '@/components/ui/VerticalParallax';
import { isMobileViewport, shouldReduceMotion, shouldUseLiteEffects } from '@/utils/device';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
  { id: 2, img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop" },
  { id: 3, img: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2000&auto=format&fit=crop" },
  { id: 4, img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop" }
];

export default function Home() {
  const manifestoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [horizontalAnim, setHorizontalAnim] = useState<gsap.core.Animation | null>(null);

  useEffect(() => {
    const isLiteMode = shouldUseLiteEffects();
    const isReducedMotion = shouldReduceMotion();
    let isActive = true;
    const imageCleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      if (textRef.current && manifestoRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { color: '#333333' },
          {
            color: '#F2F2F2',
            stagger: isLiteMode ? 0.04 : 0.08,
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top 72%',
              end: 'bottom 52%',
              scrub: isLiteMode ? 0.2 : 0.45,
            },
          }
        );
      }

      if (!scrollWrapperRef.current || !scrollTrackRef.current) return;

      if (isMobileViewport() || isReducedMotion) {
        scrollWrapperRef.current.style.height = 'auto';
        setHorizontalAnim(null);
        return;
      }

      const track = scrollTrackRef.current;
      const wrapper = scrollWrapperRef.current;

      const createAnimation = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = Math.max(trackWidth - viewportWidth, 0);

        wrapper.style.height = `${scrollDistance + window.innerHeight}px`;

        return gsap.to(track, {
          x: -scrollDistance,
          ease: 'none',
          overwrite: true,
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        });
      };

      const initAnimation = () => {
        if (!isActive) return;
        const animation = createAnimation();
        setHorizontalAnim(animation);
        ScrollTrigger.refresh();
      };

      const images = Array.from(track.querySelectorAll('img'));
      let pending = images.filter((img) => !img.complete);

      if (pending.length === 0) {
        initAnimation();
      } else {
        const handleImageReady = () => {
          if (!isActive) return;
          pending = pending.filter((img) => !img.complete);
          if (pending.length === 0) {
            initAnimation();
          }
        };

        images.forEach((img) => {
          img.addEventListener('load', handleImageReady, { once: true });
          img.addEventListener('error', handleImageReady, { once: true });
          imageCleanups.push(() => {
            img.removeEventListener('load', handleImageReady);
            img.removeEventListener('error', handleImageReady);
          });
        });
      }
    });

    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      isActive = false;
      window.clearTimeout(timer);
      imageCleanups.forEach((cleanup) => cleanup());
      setHorizontalAnim(null);
      ctx.revert();
    };
  }, []);

  return (
    <PageTransition>
      <div className="w-full bg-aerflow-dark">
        {/* FLOATING DECOR */}
        <FloatingElements />

        {/* HERO */}
        <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
          <HeroCanvas />
          
          <div className="relative z-10 flex flex-col items-center pointer-events-none text-center text-aerflow-light">
            <VerticalParallax speed={1.8}>
              <h1 className="text-[clamp(3rem,10vw,12rem)] leading-[0.85] tracking-tighter uppercase font-black drop-shadow-2xl">
                <motion.span 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  Navigăm
                </motion.span>
                <motion.span 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-serif italic font-normal text-aerflow-accent"
                >
                  Viitorul
                </motion.span>
                <motion.span 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  Digital.
                </motion.span>
              </h1>
            </VerticalParallax>
          </div>

          <VerticalParallax speed={1.3} className="absolute bottom-10 right-10 z-10">
            <div className="font-mono text-sm tracking-widest text-aerflow-light opacity-60 uppercase">
              [ SCROLL ]
            </div>
          </VerticalParallax>
        </section>

        {/* MANIFESTO */}
        <section ref={manifestoRef} className="relative w-full min-h-screen flex flex-col items-center justify-center px-8 py-32 bg-aerflow-dark z-10 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
          <VerticalParallax speed={0.4} className="w-full">
            <ParallaxText baseVelocity={-250} className="mb-20 opacity-10">
              <span className="text-[15vw] font-black uppercase leading-none tracking-tight">Aerflow • Creative • Technology • </span>
            </ParallaxText>
          </VerticalParallax>
          
          <VerticalParallax speed={2.2}>
            <h2 
              ref={textRef} 
              className="text-[clamp(2rem,6vw,6rem)] leading-tight font-sans font-bold max-w-6xl text-center text-aerflow-light"
            >
              {"Design care sfidează convențiile. Tehnologie care accelerează progresul.".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-4">{word}</span>
              ))}
            </h2>
          </VerticalParallax>

          <div data-speed="0.1" className="w-full">
            <ParallaxText baseVelocity={250} className="mt-20 opacity-10">
              <span className="text-[15vw] font-black uppercase leading-none tracking-tight">Vision • Innovation • Digital • </span>
            </ParallaxText>
          </div>
        </section>

        {/* SERVICES STACK */}
        <div className="relative z-10">
          <ServicesStack />
        </div>

        {/* HORIZONTAL WORK SHOWCASE — REFACTORED TO STICKY */}
        <section 
          ref={scrollWrapperRef} 
          className="relative w-full bg-aerflow-dark z-20"
          // We'll set the height dynamically in the useEffect for a perfect 1:1 ratio
        >
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <div 
              ref={scrollTrackRef} 
              className="absolute top-0 left-0 h-full flex items-center px-[8vw] md:px-[10vw] gap-8 md:gap-20"
            >
              {projects.map((proj, i) => (
                <div key={i} className="relative w-[80vw] md:w-[60vw] h-[55vh] md:h-[70vh] flex-shrink-0 overflow-hidden group rounded-lg md:rounded-none">
                  <ParallaxImage 
                    src={proj.img} 
                    alt="Proiect Aerflow" 
                    className="w-full h-full"
                    speed={1.4}
                    containerAnimation={horizontalAnim || undefined}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE MONOLITH FINALE */}
        <FinalMonolith />
      </div>
    </PageTransition>
  );
}
