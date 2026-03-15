import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "BRANDING\nDISRUPTIV",
    desc: "Identități vizuale care sfidează convențiile. Design care nu doar arată bine, ci dictează piața. Ne concentrăm pe esența de 1% care transformă un brand întro emoție.",
    color: "bg-aerflow-dark",
    textColor: "text-aerflow-light"
  },
  {
    id: "02",
    title: "EXPERIENȚE\nWEBGL",
    desc: "Ecosisteme digitale imersive. Transformăm interacțiunile în mișcări fluide și artă generativă. Nu facem doar site-uri, construim destinații.",
    color: "bg-[#0f0f0f]",
    textColor: "text-aerflow-accent"
  },
  {
    id: "03",
    title: "E-COMMERCE\nARHITECTURĂ",
    desc: "Performanță și conversie la nivel absolut. Scalabilitate fără compromis estetic. Optimizăm fiecare milisecundă pentru un parcurs perfect al utilizatorului.",
    color: "bg-aerflow-light",
    textColor: "text-aerflow-dark"
  }
];

export default function ServicesStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (index === services.length - 1) return; // Ultimul card nu se micșorează

        gsap.to(card, {
          scale: 0.9,
          opacity: 0.3,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: cardsRef.current[index + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
            refreshPriority: 2,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full pb-[10vh] bg-aerflow-dark" id="servicii">
      {/* Header Secțiune */}
      <div className="w-full px-8 py-20">
        <p className="font-mono text-sm tracking-widest text-aerflow-gray uppercase mb-4">
          [ Expertiza Noastră ]
        </p>
        <h2 className="text-[clamp(2rem,5vw,5rem)] font-sans font-black leading-none text-aerflow-light uppercase tracking-tighter">
          Nu livrăm opțiuni.<br />
          <span className="text-aerflow-accent font-serif italic font-normal">Livrăm soluții.</span>
        </h2>
      </div>

      {/* Stacking Cards */}
      <div className="relative w-full">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            className={`sticky top-0 h-screen w-full flex flex-col justify-between p-8 md:p-16 ${service.color} ${service.textColor} overflow-hidden`}
          >
            <div className="flex justify-between items-start w-full">
              <span className="font-mono text-xl md:text-2xl font-bold tracking-tighter">
                [{service.id}]
              </span>
              <motion.div 
                initial={{ opacity: 0, rotate: -45 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center border border-current rounded-full"
              >
                ↓
              </motion.div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end w-full gap-10">
              <h3 className="text-[clamp(4rem,10vw,12rem)] font-black uppercase leading-[0.85] tracking-tighter whitespace-pre-line">
                {service.title}
              </h3>
              <p className="max-w-sm md:max-w-md font-sans text-sm md:text-lg leading-relaxed md:pb-4 font-medium opacity-80">
                {service.desc}
              </p>
            </div>
            
            {/* Zgomot subtil local pentru fiecare card */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}></div>
          </div>
        ))}
      </div>
    </section>
  );
}
