import MagneticButton from '../ui/MagneticButton';

export default function Footer() {
  return (
    <footer className="w-full bg-aerflow-dark text-aerflow-light px-8 py-12 border-t border-aerflow-light/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end">
        <div className="flex flex-col space-y-4">
          <span className="text-xs font-mono text-aerflow-gray tracking-widest">[ SOCIAL ]</span>
          <div className="flex space-x-6 text-sm font-sans uppercase font-bold tracking-wider">
            <MagneticButton><a href="#">Instagram</a></MagneticButton>
            <MagneticButton><a href="#">LinkedIn</a></MagneticButton>
            <MagneticButton><a href="#">Awwwards</a></MagneticButton>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <span className="text-xs font-mono text-aerflow-gray tracking-widest">[ BIROU ]</span>
          <p className="text-sm font-sans leading-relaxed text-aerflow-light/80">
            Str. Creativității Nr. 12<br />
            București, România
          </p>
        </div>

        <div className="flex flex-col space-y-4 md:text-right">
          <span className="text-xs font-mono text-aerflow-gray tracking-widest">[ LEGAL ]</span>
          <div className="flex space-x-6 md:justify-end text-sm font-sans uppercase text-aerflow-light/60">
            <a href="#" className="hover:text-aerflow-light transition-colors">Termeni</a>
            <a href="#" className="hover:text-aerflow-light transition-colors">Confidențialitate</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
