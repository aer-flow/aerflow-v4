1. Modify `ServicesStack.tsx` to separate the sticky wrapper from the animated content.
2. Animate the inner `div` (`innerCardsRef`) to avoid jitter from animating `scale` on a `sticky` element.
3. Completely disable `VerticalParallax` on mobile inside the cards by adding a check, or rely on the inner optimization. If `baseIntensity` is `0.15`, let's just make it `0` on mobile if it's still laggy, or conditionally render the parity.
