import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import VerticalParallax from '@/components/ui/VerticalParallax';
import { isMobileViewport, shouldReduceMotion } from '@/utils/device';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "PREZENȚĂ\nDIGITALĂ",
    desc: "Ai deja o afacere excelentă. Ne asigurăm că și internetul știe asta. Construim identități vizuale care sfidează convențiile, concentrându-ne pe acea esență care transformă un brand într-o emoție și o primă impresie imposibil de ignorat.",
    color: "bg-aerflow-dark",
    textColor: "text-aerflow-light"
  },
  {
    id: "02",
    title: "NARAȚIUNE\nVIZUALĂ",
    desc: "Oamenii nu citesc, scanează. Folosim un design intenționat—tipografie curată, mișcare subtilă și structură clară—pentru a ghida atenția natural. Fără artificii. Doar o poveste spusă exact cum trebuie.",
    color: "bg-[#0f0f0f]",
    textColor: "text-aerflow-accent"
  },
  {
    id: "03",
    title: "SISTEME &\nCONVERSIE",
    desc: "Un site bun arată bine, un site excelent muncește pentru tine. Fie că ai nevoie de un magazin online fluid sau de fluxuri care automatizează procesul de vânzare, construim o fundație care îți eliberează timpul.",
    color: "bg-aerflow-light",
    textColor: "text-aerflow-dark"
  }
];

export default function ServicesStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = isMobileViewport();
      const reduceMotion = shouldReduceMotion();
      if (reduceMotion) return;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const innerCard = innerCardsRef.current[index];
        const shouldPinCard = index < services.length - 1;
        if (!innerCard) return;

        const travelAmount = isMobile ? 6 : 9;
        const scrubAmount = isMobile ? 0.48 : 0.7;

        gsap.fromTo(innerCard, {
          yPercent: travelAmount,
        }, {
          yPercent: -travelAmount,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: scrubAmount,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        if (!isMobile && shouldPinCard) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top top",
              end: "+=100%",
              pin: true,
              pinSpacing: false,
              scrub: 0.45,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              pinType: "fixed",
            }
          });

          tl.to(innerCard, {
            scale: 0.94,
            opacity: 0.45,
            transformOrigin: "top center",
            ease: "none"
          }, 0);
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full pb-[10vh] bg-aerflow-dark" id="servicii">
      {/* Header Secțiune */}
      <div className="w-full px-8 py-20">
        <VerticalParallax speed={1.3} disabledOnMobile>
          <p className="font-mono text-sm tracking-widest text-aerflow-gray uppercase mb-4">
            [ Expertiza Noastră ]
          </p>
        </VerticalParallax>
        <VerticalParallax speed={1.8} disabledOnMobile>
          <h2 className="text-[clamp(2.2rem,5vw,5.5rem)] font-sans font-black leading-none text-aerflow-light uppercase tracking-tighter">
            Nu livrăm opțiuni.<br />
            <span className="text-aerflow-accent font-serif italic font-normal text-[1.1em]">Livrăm soluții.</span>
          </h2>
        </VerticalParallax>
      </div>

      {/* Responsive Cards - mobile flow, desktop stacking */}
      <div className="relative w-full">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="relative min-h-[100svh] md:h-screen w-full"
          >
            <div
              ref={(el) => { innerCardsRef.current[index] = el; }}
              className={`w-full min-h-[100svh] md:h-full flex flex-col justify-center p-8 md:p-16 ${service.color} ${service.textColor} origin-top will-change-transform overflow-hidden md:overflow-visible`}
            >
              {/* Mobile Header - Repositioned to be visible below Navbar */}
              <div className="absolute top-28 left-8 right-8 md:static flex justify-between items-start md:w-full mb-8 md:mb-12">
                <VerticalParallax speed={1.5} disabledOnMobile>
                  <span className="font-mono text-lg md:text-2xl font-bold tracking-tighter">
                    [{service.id}]
                  </span>
                </VerticalParallax>
                <div className="w-10 h-10 flex md:hidden items-center justify-center border border-current rounded-full">
                  ↓
                </div>
                <motion.div 
                  initial={{ opacity: 0, rotate: -45 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="hidden md:flex w-20 h-20 items-center justify-center border border-current rounded-full"
                >
                  ↓
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8 md:gap-10">
                <VerticalParallax speed={1.8} disabledOnMobile>
                  <h3 className="flex flex-col gap-2 md:gap-4 text-[clamp(2.5rem,12vw,14rem)] font-black uppercase leading-[0.85] tracking-tight mb-4 md:mb-0">
                    {service.title.split('\n').map((line, i) => (
                      <span 
                        key={i} 
                        className={`block ${i === 1 ? 'pl-8 md:pl-28' : ''}`}
                      >
                        {line}
                      </span>
                    ))}
                  </h3>
                </VerticalParallax>
                <VerticalParallax speed={2.0} disabledOnMobile>
                  <p className="max-w-sm md:max-w-md font-sans text-sm md:text-xl leading-relaxed md:pb-8 font-medium opacity-90">
                    {service.desc}
                  </p>
                </VerticalParallax>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
