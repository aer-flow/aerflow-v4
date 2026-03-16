import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { 
  ArrowRight, 
  Monitor, 
  Globe, 
  Zap, 
  Menu, 
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

// Utility for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Optimized Scroll Listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out rounded-full px-6 py-3 flex items-center gap-8 will-change-transform",
        scrolled 
          ? "w-[90%] max-w-4xl bg-ivory/80 backdrop-blur-xl border border-obsidian/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
          : "w-[95%] max-w-6xl bg-transparent text-ivory"
      )}
    >
      <div className={cn("text-xl font-bold tracking-tight transition-colors duration-500", scrolled ? "text-obsidian" : "text-ivory")}>
        Aerflow <span className="text-[10px] font-mono opacity-50 px-2 py-1 bg-champagne/20 rounded ml-2">v1.2-GODMODE</span>
      </div>
      
      <div className="hidden md:flex items-center gap-12 text-sm font-medium">
        {['Servicii', 'Proces', 'Filozofie', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="lift-hover hover:opacity-70 tracking-wide transition-opacity">
            {item}
          </a>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-4">
        <button className="hidden md:block bg-champagne text-obsidian px-5 py-2 rounded-full text-sm font-bold magnetic-button shadow-lg shadow-champagne/20">
          Cere o Ofertă
        </button>
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium Text Reveal
      gsap.from(".hero-text", {
        y: 80,
        opacity: 0,
        rotationX: -15,
        duration: 1.4,
        stagger: 0.1,
        ease: "power4.out",
        transformOrigin: "bottom center"
      });

      // Buttery Smooth Parallax on Image
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-obsidian">
      {/* Background Image with Parallax wrapper */}
      <div className="absolute inset-[-10%] w-[120%] h-[120%] z-0" ref={imageRef}>
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Interior" 
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent pointer-events-none" />
      
      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-20 lg:p-32 max-w-7xl">
        <div className="max-w-4xl perspective-1000">
          <h1 className="hero-text text-ivory text-4xl md:text-6xl font-bold mb-4 tracking-tight will-change-transform">
            Experiențe digitale care
          </h1>
          <h2 className="hero-text text-champagne text-7xl md:text-[9rem] font-drama italic leading-tight mb-8 will-change-transform">
            Aerflow.
          </h2>
          <p className="hero-text text-ivory/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed will-change-transform">
            Construim prezența online care reflectă valoarea reală a afacerii tale. 
            Design editorial întâlnește performanța tehnică.
          </p>
          <button className="hero-text bg-champagne text-obsidian px-8 py-4 rounded-full font-bold flex items-center gap-3 magnetic-button group will-change-transform">
            Începe Proiectul Tău
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

const FeatureShuffler = () => {
  const [items, setItems] = useState(['Design Epic', 'Cod Curat', 'Viteză Maximă']);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setItems(prev => {
        const next = [...prev];
        const last = next.pop();
        if (last) next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-64 flex flex-col items-center justify-center relative overflow-hidden">
      {items.map((item, i) => (
        <div 
          key={item}
          className={cn(
            "absolute transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] bg-ivory border border-obsidian/10 rounded-2xl px-8 py-4 shadow-sm w-48 text-center hardware-accelerate",
            i === 0 ? "scale-110 opacity-100 z-20 translate-y-0 shadow-xl shadow-obsidian/5" : 
            i === 1 ? "scale-90 opacity-40 z-10 translate-y-12" : 
            "scale-75 opacity-10 z-0 translate-y-24"
          )}
        >
          <span className="font-bold text-obsidian">{item}</span>
        </div>
      ))}
    </div>
  );
};

const TelemetryTypewriter = () => {
  const [text, setText] = useState('');
  const fullText = "> Optimizare SEO finalizată... [100%]";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length + 10) i = 0; // Pause at end
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-64 font-mono text-sm p-6 bg-obsidian text-champagne/80 rounded-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-champagne/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          <span className="text-[10px] uppercase tracking-widest text-green-500/80">Live Status</span>
        </div>
        <p>{text}<span className="inline-block w-2 h-4 bg-champagne ml-1 animate-pulse" /></p>
        <div className="mt-8 opacity-40 font-bold">
          <p>Memory: 12.4GB stable</p>
          <p>CDN: Bucharest Node Active</p>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="servicii" className="relative py-32 px-8 bg-ivory z-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div className="bg-white p-10 rounded-cinema border border-obsidian/5 shadow-2xl shadow-obsidian/[0.03] hover:border-champagne/30 transition-all duration-500 flex flex-col h-full group hover:-translate-y-2 will-change-transform">
          <FeatureShuffler />
          <div className="mt-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Design Boutique</h3>
            <p className="text-slate/70">Nu doar un site, ci o identitate vizuală care comandă respect și atenție.</p>
          </div>
        </div>
        <div className="bg-white p-10 rounded-cinema border border-obsidian/5 shadow-2xl shadow-obsidian/[0.03] hover:border-champagne/30 transition-all duration-500 flex flex-col h-full group hover:-translate-y-2 will-change-transform">
          <TelemetryTypewriter />
          <div className="mt-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Performanță Pură</h3>
            <p className="text-slate/70">Scriem cod care se încarcă instant, optimizat pentru orice motor de căutare.</p>
          </div>
        </div>
        <div className="bg-white p-10 rounded-cinema border border-obsidian/5 shadow-2xl shadow-obsidian/[0.03] hover:border-champagne/30 transition-all duration-500 flex flex-col h-full items-center justify-center text-center group hover:-translate-y-2 will-change-transform">
          <div className="w-full h-64 flex items-center justify-center mb-8 relative">
            {/* Optimized Grid animation without JS */}
            <div className="grid grid-cols-7 gap-2 w-full max-w-[240px] opacity-40 group-hover:opacity-80 transition-opacity duration-700">
              {Array.from({length: 28}).map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "aspect-square rounded-md transition-all duration-700", 
                    i === 12 
                      ? "bg-champagne opacity-100 shadow-[0_0_20px_rgba(201,168,76,0.6)] scale-110" 
                      : "border border-obsidian/20 group-hover:border-champagne/40"
                  )} 
                />
              ))}
            </div>
          </div>
          <div className="mt-auto">
            <h3 className="text-2xl font-bold mb-4">Suport Continuu</h3>
            <p className="text-slate/70">Suntem partenerul tău pe termen lung, asigurând că site-ul tău rămâne actual.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProtocolSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // REWRITTEN: Removed the jittery onUpdate blur logic. 
    // Using GSAP's timeline for GPU-accelerated opacity & scale fading.
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".protocol-card") as HTMLElement[];
      
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top top",
              end: "bottom top",
              scrub: true,
              pin: true,
              pinSpacing: false, // Stack them smoothly
              anticipatePin: 1, // Crucial for removing snap
            }
          });
        } else {
          // Last card just pins
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            end: "+=100%",
            pin: true,
            anticipatePin: 1,
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { num: "01", title: "Analiză Strategică", desc: "Înțelegem obiectivele afacerii tale înainte de a scrie prima linie de cod.", icon: <Globe className="w-12 h-12 text-champagne mb-8" /> },
    { num: "02", title: "Arhitectură de Design", desc: "Creăm un prototip care îmbină estetica de lux cu funcționalitatea modernă.", icon: <Monitor className="w-12 h-12 text-champagne mb-8" /> },
    { num: "03", title: "Lansare și Mentenanță", desc: "Implementăm și monitorizăm succesul site-ului tău în timp real.", icon: <Zap className="w-12 h-12 text-champagne mb-8" /> }
  ];

  return (
    <section ref={sectionRef} className="bg-obsidian relative">
      {steps.map((step, i) => (
        <div 
          key={step.num} 
          className="protocol-card h-[100dvh] w-full flex items-center justify-center bg-obsidian border-t border-ivory/5 absolute top-0 left-0 will-change-transform"
          style={{ position: i === 0 ? 'relative' : 'absolute' } as React.CSSProperties}
        >
          <div className="text-center max-w-2xl px-8">
            <span className="font-mono text-champagne/40 tracking-[0.5em] block mb-4">{step.num} // PROTOCOL</span>
            <div className="flex justify-center">{step.icon}</div>
            <h2 className="text-ivory text-5xl md:text-6xl font-bold mb-6 tracking-tight">{step.title}</h2>
            <p className="text-ivory/60 text-lg leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
      {/* Spacer for absolute positioning layout */}
      <div style={{ height: `${(steps.length - 1) * 100}vh` }} />
    </section>
  );
};

const Philosophy = () => {
  return (
    <section id="filozofie" className="py-40 bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
          alt="" 
          className="w-full h-full object-cover" 
          loading="lazy"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="max-w-4xl">
          <p className="text-ivory/40 text-xl mb-8 font-mono">/ Viziune</p>
          <h2 className="text-ivory text-5xl md:text-[5rem] font-bold leading-[1.1] mb-12 tracking-tight">
            Majoritatea agențiilor folosesc template-uri.<br/> Noi construim <span className="text-champagne font-drama italic pr-4">instrumente digitale</span> care domină piețe.
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-ivory/20 to-transparent mb-12" />
          <div className="grid md:grid-cols-2 gap-12">
            <div className="group cursor-default">
              <h4 className="text-champagne font-bold mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-champagne transition-transform group-hover:scale-150" />
                Standardul Aerflow
              </h4>
              <p className="text-ivory/60 leading-relaxed">Fiecare pixel este plasat cu intenție. Fiecare animație are greutate. Nu acceptăm compromisuri de calitate.</p>
            </div>
            <div className="group cursor-default">
              <h4 className="text-champagne font-bold mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-champagne transition-transform group-hover:scale-150" />
                Focus pe Rezultat
              </h4>
              <p className="text-ivory/60 leading-relaxed">Un site frumos care nu vinde este un eșec. Construim pentru conversie și prestigiu pe termen lung.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-obsidian pt-32 pb-12 px-8 rounded-t-[4rem] border-t border-ivory/10 relative z-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-2">
          <h2 className="text-ivory text-4xl font-bold mb-6 tracking-tight">Aerflow.</h2>
          <p className="text-ivory/40 max-w-xs mb-8 leading-relaxed">Precizie digitală pentru afacerile care refuză banalul.</p>
          <div className="flex items-center gap-3 font-mono text-[10px] text-green-500 uppercase tracking-widest bg-green-500/10 w-max px-4 py-2 rounded-full border border-green-500/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            Sistem Operațional Online
          </div>
        </div>
        <div>
          <h4 className="text-ivory font-bold mb-6 italic font-drama text-xl">Navigare</h4>
          <ul className="text-ivory/40 space-y-4">
            <li><a href="#servicii" className="hover:text-champagne transition-colors">Servicii</a></li>
            <li><a href="#proces" className="hover:text-champagne transition-colors">Proces</a></li>
            <li><a href="#filozofie" className="hover:text-champagne transition-colors">Filozofie</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-ivory font-bold mb-6 italic font-drama text-xl">Contact</h4>
          <ul className="text-ivory/40 space-y-4">
            <li className="hover:text-champagne transition-colors cursor-pointer">hello@aerflow.ro</li>
            <li>București, România</li>
            <li className="hover:text-champagne transition-colors cursor-pointer">+40 700 000 000</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-12 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-ivory/20 text-xs text-center md:text-left">© {new Date().getFullYear()} Aerflow Digital Atelier. Toate drepturile rezervate.</p>
        <div className="flex gap-8 text-ivory/20 text-xs font-medium tracking-wide">
          <a href="#" className="hover:text-ivory transition-colors">Politica de Confidențialitate</a>
          <a href="#" className="hover:text-ivory transition-colors">Termeni și Condiții</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  // CORE ENGINE INITIALIZATION: Lenis + GSAP Sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom premium easing
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize Lenis scroll with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Merge GSAP ticker and Lenis RAF for butter-smooth rendering
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    // Stop GSAP from lagging behind the Lenis smooth scroll
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  return (
    <main className="bg-ivory selection:bg-champagne selection:text-obsidian overflow-clip">
      {/* Optimized Noise Filter */}
      <svg className="noise-overlay" aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <ProtocolSection />
      <Footer />
    </main>
  );
}
