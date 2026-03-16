import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileViewport, shouldReduceMotion, shouldUseLiteEffects } from '@/utils/device';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxTextProps {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
  enableOnMobile?: boolean;
  mobileVelocityFactor?: number;
}

export default function ParallaxText({ 
  children, 
  baseVelocity = 150, // Increased for better visibility
  className = "",
  enableOnMobile = false,
  mobileVelocityFactor = 0.45,
}: ParallaxTextProps) {
  const container = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current || !text.current) return;

    const reduceMotion = shouldReduceMotion();
    const liteMode = shouldUseLiteEffects();
    const isMobile = isMobileViewport();
    if (reduceMotion || (liteMode && !enableOnMobile)) return;

    const travelDistance = (liteMode || isMobile)
      ? -baseVelocity * mobileVelocityFactor
      : -baseVelocity;

    const ctx = gsap.context(() => {
      gsap.to(text.current, {
        x: travelDistance,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: liteMode || isMobile ? 0.35 : 0.5,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [baseVelocity, enableOnMobile, mobileVelocityFactor]);

  return (
    <div ref={container} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={text} className="inline-block will-change-transform">
        {children}
      </div>
    </div>
  );
}
