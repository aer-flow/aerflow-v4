import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import PageTransition from '@/components/core/PageTransition';
import ParallaxImage from '@/components/ui/ParallaxImage';
import ParallaxText from '@/components/ui/ParallaxText';
import VerticalParallax from '@/components/ui/VerticalParallax';
import { shouldReduceMotion, shouldUseLiteEffects } from '@/utils/device';

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = lazy(() => import('@/components/webgl/HeroCanvas'));
const ServicesStack = lazy(() => import('@/components/layout/ServicesStack'));
const FinalMonolith = lazy(() => import('@/components/layout/FinalMonolith'));
const FloatingElements = lazy(() => import('@/components/ui/FloatingElements'));

const projects = [
  { id: 1, img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
  { id: 2, img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop" },
  { id: 3, img: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2000&auto=format&fit=crop" },
  { id: 4, img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop" }
];

function HeroFallback() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#070707] via-[#0d0d0d] to-[#070707]" />
      <div className="absolute inset-0 bg-aerflow-dark/20" />
    </div>
  );
}

function DeferredSection({
  children,
  fallback,
  minHeight,
  rootMargin = '400px',
}: {
  children: ReactNode;
  fallback: ReactNode;
  minHeight: string;
  rootMargin?: string;
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender) return;
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={sectionRef} style={{ minHeight }}>
      {shouldRender ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
}

export default function Home() {
  const manifestoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [horizontalAnim, setHorizontalAnim] = useState<gsap.core.Animation | null>(null);
  const useLiteShowcase = shouldReduceMotion();

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

      if (!scrollWrapperRef.current || !scrollTrackRef.current || !scrollViewportRef.current) return;

      if (isReducedMotion) {
        scrollWrapperRef.current.style.height = 'auto';
        setHorizontalAnim(null);
        return;
      }

      const track = scrollTrackRef.current;
      const wrapper = scrollWrapperRef.current;
      const viewport = scrollViewportRef.current;

      const createAnimation = () => {
        const getScrollDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

        return gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          overwrite: true,
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            pin: viewport,
            pinSpacing: true,
            anticipatePin: 1,
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
        <Suspense fallback={null}>
          <FloatingElements />
        </Suspense>

        {/* HERO */}
        <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
          <Suspense fallback={<HeroFallback />}>
            <HeroCanvas />
          </Suspense>
          
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
          <Suspense fallback={<div className="min-h-[320vh] w-full bg-aerflow-dark" />}>
            <ServicesStack />
          </Suspense>
        </div>

        {useLiteShowcase ? (
          <section className="relative z-20 w-full overflow-hidden bg-aerflow-dark px-4 py-14">
            <div className="mb-6 px-2 font-mono text-xs tracking-[0.25em] text-aerflow-gray uppercase">
              [ Selected Work ]
            </div>
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-4 [scrollbar-width:none] [-ms-overflow-style:none]">
              {projects.map((proj, i) => (
                <div key={i} className="relative h-[52vh] w-[84vw] flex-shrink-0 snap-center overflow-hidden rounded-lg">
                  <ParallaxImage
                    src={proj.img}
                    alt="Proiect Aerflow"
                    className="h-full w-full"
                    speed={1.1}
                  />
                  <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section
            ref={scrollWrapperRef}
            className="relative z-20 w-full overflow-hidden bg-aerflow-dark"
          >
            <div
              ref={scrollViewportRef}
              className="relative h-screen w-full overflow-hidden"
            >
              <div
                ref={scrollTrackRef}
                className="absolute top-0 left-0 flex h-full w-max items-center gap-8 px-[8vw] will-change-transform md:gap-20 md:px-[10vw]"
              >
                {projects.map((proj, i) => (
                  <div key={i} className="group relative h-[55vh] w-[80vw] flex-shrink-0 overflow-hidden rounded-lg md:h-[70vh] md:w-[60vw] md:rounded-none">
                    <ParallaxImage
                      src={proj.img}
                      alt="Proiect Aerflow"
                      className="h-full w-full"
                      speed={1.4}
                      containerAnimation={horizontalAnim || undefined}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/10" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* THE MONOLITH FINALE */}
        <DeferredSection
          minHeight="100vh"
          fallback={<div className="h-screen w-full bg-[#020202]" />}
        >
          <FinalMonolith />
        </DeferredSection>
      </div>
    </PageTransition>
  );
}
