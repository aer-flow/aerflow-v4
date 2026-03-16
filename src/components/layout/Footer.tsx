import MagneticButton from '../ui/MagneticButton';
import VerticalParallax from '../ui/VerticalParallax';

export default function Footer() {
  return (
    <footer className="w-full bg-aerflow-dark text-aerflow-light px-8 py-12 border-t border-aerflow-light/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end">
        <div className="flex flex-col space-y-4">
          <VerticalParallax speed={1.12} intensity={0.95}>
            <span className="text-xs font-mono text-aerflow-gray tracking-widest">[ SOCIAL ]</span>
          </VerticalParallax>
          <VerticalParallax speed={1.28} intensity={1.05}>
            <div className="flex space-x-6 text-sm font-sans uppercase font-bold tracking-wider">
              <MagneticButton><a href="#">Instagram</a></MagneticButton>
              <MagneticButton><a href="#">LinkedIn</a></MagneticButton>
              <MagneticButton><a href="#">Awwwards</a></MagneticButton>
            </div>
          </VerticalParallax>
        </div>

        <div className="flex flex-col space-y-4">
          <VerticalParallax speed={1.14} intensity={0.95}>
            <span className="text-xs font-mono text-aerflow-gray tracking-widest">[ BIROU ]</span>
          </VerticalParallax>
          <VerticalParallax speed={1.22} intensity={1.05}>
            <p className="text-sm font-sans leading-relaxed text-aerflow-light/80">
              Str. Creativității Nr. 12<br />
              București, România
            </p>
          </VerticalParallax>
        </div>

        <div className="flex flex-col space-y-4 md:text-right">
          <VerticalParallax speed={1.12} intensity={0.95}>
            <span className="text-xs font-mono text-aerflow-gray tracking-widest">[ LEGAL ]</span>
          </VerticalParallax>
          <VerticalParallax speed={1.26} intensity={1.05}>
            <div className="flex space-x-6 md:justify-end text-sm font-sans uppercase text-aerflow-light/60">
              <a href="#" className="hover:text-aerflow-light transition-colors">Termeni</a>
              <a href="#" className="hover:text-aerflow-light transition-colors">Confidențialitate</a>
            </div>
          </VerticalParallax>
        </div>
      </div>
    </footer>
  );
}
