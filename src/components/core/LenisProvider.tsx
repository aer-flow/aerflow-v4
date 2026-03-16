import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { isMobileViewport, isTouchDevice, shouldReduceMotion } from '@/utils/device';

gsap.registerPlugin(ScrollTrigger);
type WindowWithLenis = Window & { lenis?: Lenis | null };

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    gsap.ticker.lagSmoothing(0);

    if (shouldReduceMotion()) {
      ScrollTrigger.normalizeScroll(false);
      return;
    }

    const touchDevice = isTouchDevice();
    const mobileViewport = isMobileViewport();

    const lenis = new Lenis({
      duration: touchDevice || mobileViewport ? 1.35 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: touchDevice,
      syncTouchLerp: touchDevice ? 0.06 : undefined,
      touchInertiaMultiplier: touchDevice ? 22 : undefined,
      wheelMultiplier: mobileViewport ? 0.95 : 1,
      touchMultiplier: touchDevice ? 0.82 : 1.1,
    });

    lenis.on('scroll', ScrollTrigger.update);
    (window as WindowWithLenis).lenis = lenis;

    const refresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', refresh);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    return () => {
      (window as WindowWithLenis).lenis = null;
      ScrollTrigger.removeEventListener('refresh', refresh);
      lenis.destroy();
      gsap.ticker.remove(update);
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return <>{children}</>;
}
