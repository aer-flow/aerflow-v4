export const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

export const clamp = (min: number, max: number, value: number) => {
  return Math.min(Math.max(value, min), max);
};
