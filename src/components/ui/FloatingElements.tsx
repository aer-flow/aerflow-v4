import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Glossy Circle 1 */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-gradient-to-br from-aerflow-accent/10 to-transparent blur-3xl"
      />
      
      {/* Glossy Circle 2 */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[60%] right-[10%] w-96 h-96 rounded-full bg-gradient-to-tr from-aerflow-accent/5 to-transparent blur-3xl"
      />

      {/* Glossy Circle 3 */}
      <motion.div
        style={{ y: y3, rotate: -rotate }}
        className="absolute bottom-[20%] left-[40%] w-48 h-48 rounded-full bg-gradient-to-bl from-white/5 to-transparent blur-2xl"
      />

      {/* Glassy Card Fragment */}
      <motion.div
        style={{ y: y1, rotate: 15, willChange: "transform" }}
        className="absolute top-[30%] right-[20%] w-32 h-48 border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl"
      />
    </div>
  );
}
