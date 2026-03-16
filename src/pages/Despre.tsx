import { useRef } from 'react';
import PageTransition from '@/components/core/PageTransition';
import VerticalParallax from '@/components/ui/VerticalParallax';

const methodBlocks = [
  { id: "01", title: "Analiză & Arhitectură", desc: "Nu ghicim. Calculăm. Punem bazele scalabilității înainte de a scrie prima linie de cod." },
  { id: "02", title: "Direcție de Artă", desc: "Design care nu doar arată bine, ci dictează piața. Estetică funcțională." },
  { id: "03", title: "WebGL & Interactivitate", desc: "Experiențe imersive prin cod creativ. Diferența dintre un site și o destinație." },
  { id: "04", title: "Implementare & Lansare", desc: "Performanță tehnică absolută. Optimizare milisecundă cu milisecundă." }
];

export default function Despre() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <PageTransition>
      <div className="w-full bg-aerflow-light text-aerflow-dark min-h-screen pt-40" ref={containerRef}>
        <div className="max-w-screen-2xl mx-auto px-8">
          
          <VerticalParallax speed={1.4}>
            <h1 className="text-[clamp(4rem,8vw,10rem)] font-black uppercase leading-[0.9] tracking-tighter mb-40">
              Arhitecții<br/>
              <span className="font-serif italic font-normal text-aerflow-gray">Noului Val</span>
            </h1>
          </VerticalParallax>

          <div className="flex flex-col md:flex-row gap-20 relative items-start pb-40">
            {/* STICKY LEFT */}
            <div className="md:w-1/3 sticky top-40">
              <VerticalParallax speed={1.1}>
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-4">
                  Metodologia Solve & Evolve™
                </h2>
              </VerticalParallax>
              <VerticalParallax speed={1.05}>
                <p className="text-aerflow-gray font-mono text-sm leading-relaxed">
                  Refuzăm compromisul. Fiecare proiect este o demonstrație de forță tehnologică și rafinament vizual. Așa transformăm viziunile în monopoluri digitale.
                </p>
              </VerticalParallax>
            </div>

            {/* SCROLLING RIGHT */}
            <div className="md:w-2/3 flex flex-col gap-32">
              {methodBlocks.map((block, i) => (
                <div key={i} className="flex flex-col border-t border-aerflow-dark/20 pt-8">
                  <VerticalParallax speed={1.07}>
                    <span className="text-sm font-mono font-bold text-aerflow-gray mb-8 block">[{block.id}]</span>
                  </VerticalParallax>
                  <VerticalParallax speed={1.15}>
                    <h3 className="text-[clamp(2rem,4vw,4rem)] font-black uppercase tracking-tight leading-none mb-6">
                      {block.title}
                    </h3>
                  </VerticalParallax>
                  <VerticalParallax speed={1.1}>
                    <p className="text-xl md:text-2xl font-sans text-aerflow-dark/80 max-w-2xl leading-relaxed">
                      {block.desc}
                    </p>
                  </VerticalParallax>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
