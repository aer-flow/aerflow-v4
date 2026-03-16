import { useRef, useLayoutEffect } from 'react';
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
  baseVelocity = 150,
  className = "",
  enableOnMobile = false,
  mobileVelocityFactor = 0.45,
}: ParallaxTextProps) {
  const container = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scope = container.current;
    const target = text.current;
    if (!scope || !target) return;

    const reduceMotion = shouldReduceMotion();
    const liteMode = shouldUseLiteEffects();
    const isMobile = isMobileViewport();
    if (reduceMotion || (liteMode && !enableOnMobile)) return;

    const travelDistance = (liteMode || isMobile)
      ? -baseVelocity * mobileVelocityFactor
      : -baseVelocity;

    const ctx = gsap.context(() => {
      gsap.to(target, {
        x: travelDistance,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: scope,
          start: "top bottom+=8%",
          end: "bottom top-=8%",
          scrub: liteMode || isMobile ? 0.24 : 0.36,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });
    }, scope);

    return () => ctx.revert();
  }, [baseVelocity, enableOnMobile, mobileVelocityFactor]);

  return (
    <div ref={container} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={text} className="inline-block will-change-transform [transform:translate3d(0,0,0)]">
        {children}
      </div>
    </div>
  );
}
