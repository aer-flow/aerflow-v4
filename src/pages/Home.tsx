import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import HeroCanvas from '@/components/webgl/HeroCanvas';
import PageTransition from '@/components/core/PageTransition';
import ServicesStack from '@/components/layout/ServicesStack';
import FinalMonolith from '@/components/layout/FinalMonolith';

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

  useEffect(() => {
    // Manifesto Scroll Animation
    if (textRef.current) {
      const words = textRef.current.children;
      gsap.fromTo(words, 
        { color: "#333333" },
        {
          color: "#F2F2F2",
          stagger: 0.1,
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: true,
          }
        }
      );
    }

    // Horizontal Scroll Animation
    if (scrollWrapperRef.current && scrollTrackRef.current) {
      const totalWidth = scrollTrackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;

      gsap.to(scrollTrackRef.current, {
        x: -(totalWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: scrollWrapperRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          refreshPriority: 1,
        }
      });
    }

    // Refresh triggers to ensure correct layout after components mount
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <PageTransition>
      <div className="w-full bg-aerflow-dark">
        {/* HERO */}
        <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
          <HeroCanvas />
          
          <div className="relative z-10 flex flex-col items-center pointer-events-none text-center text-aerflow-light">
            <h1 className="text-[clamp(3rem,10vw,12rem)] leading-[0.85] tracking-tighter uppercase font-black drop-shadow-2xl">
              <span className="block">Navigăm</span>
              <span className="block font-serif italic font-normal text-aerflow-accent">Viitorul</span>
              <span className="block">Digital.</span>
            </h1>
          </div>

          <div className="absolute bottom-10 right-10 z-10 font-mono text-sm tracking-widest text-aerflow-light opacity-60">
            [ SCROLL ]
          </div>
        </section>

        {/* MANIFESTO */}
        <section ref={manifestoRef} className="w-full min-h-screen flex items-center justify-center px-8 py-32 bg-aerflow-dark">
          <h2 ref={textRef} className="text-[clamp(2rem,6vw,6rem)] leading-tight font-sans font-bold max-w-6xl">
            {"Design care sfidează convențiile. Tehnologie care accelerează progresul.".split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-4">{word}</span>
            ))}
          </h2>
        </section>

        {/* SERVICES STACK */}
        <ServicesStack />

        {/* HORIZONTAL WORK SHOWCASE */}
        <section ref={scrollWrapperRef} className="relative w-full h-screen bg-aerflow-dark overflow-hidden">
          <div ref={scrollTrackRef} className="absolute top-0 left-0 h-full flex items-center px-[5vw] md:px-[10vw] gap-10 md:gap-20">
            {projects.map((proj, i) => (
              <div key={i} className="relative w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] flex-shrink-0 overflow-hidden group">
                <img 
                  src={proj.img} 
                  alt="Proiect Aerflow" 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-awwwards group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
              </div>
            ))}
          </div>
        </section>

        {/* THE MONOLITH FINALE */}
        <FinalMonolith />
      </div>
    </PageTransition>
  );
}
