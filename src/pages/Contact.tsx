import { useState } from 'react';
import PageTransition from '@/components/core/PageTransition';
import GlitchText from '@/components/ui/GlitchText';
import VerticalParallax from '@/components/ui/VerticalParallax';

export default function Contact() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <PageTransition>
      <div 
        className={`w-full h-screen flex flex-col transition-colors duration-1000 ease-awwwards ${isHovered ? 'bg-[#0a1205]' : 'bg-aerflow-dark'}`}
      >
        <div className="flex-1 flex items-center justify-center px-8 relative">
          
          {/* Central Interactive Text */}
          <div 
            className="text-center cursor-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <VerticalParallax speed={1.2}>
              <div className="text-xs font-mono text-aerflow-gray tracking-widest mb-8 uppercase">
                [ Ai un proiect curajos? ]
              </div>
            </VerticalParallax>
            
            <VerticalParallax speed={1.3}>
              <a href="mailto:hello@aerflow.ro" className="inline-block relative">
                <h1 className="text-[clamp(3rem,8vw,10rem)] font-black uppercase tracking-tighter text-aerflow-light hover:text-aerflow-accent transition-colors duration-500">
                  {isHovered ? <GlitchText text="HELLO@AERFLOW.RO" /> : "SĂ ÎNCEPEM."}
                </h1>
              </a>
            </VerticalParallax>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
