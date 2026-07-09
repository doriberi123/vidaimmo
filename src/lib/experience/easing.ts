/**
 * Minimaler Cubic-Bezier-Easing-Solver (Newton-Raphson mit Bisektions-Fallback).
 * Bildet dieselbe Kurve wie die CSS-Variable
 * --ease-cinematic: cubic-bezier(0.2, 0.7, 0.2, 1) nach, damit sich
 * JS-getriebene Scroll-Sprünge und native CSS-Transitions gleich anfühlen.
 */
function bezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  const sampleCurveX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleCurveY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleCurveDerivativeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  const solveCurveX = (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const dx = sampleCurveX(t) - x;
      if (Math.abs(dx) < 1e-6) return t;
      const d = sampleCurveDerivativeX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= dx / d;
    }
    let lo = 0;
    let hi = 1;
    t = x;
    while (lo < hi) {
      const dx = sampleCurveX(t) - x;
      if (Math.abs(dx) < 1e-6) return t;
      if (dx > 0) hi = t;
      else lo = t;
      t = (hi - lo) / 2 + lo;
    }
    return t;
  };

  return (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : sampleCurveY(solveCurveX(t)));
}

/** Entspricht --ease-cinematic aus globals.css. */
export const cinematicEase = bezier(0.2, 0.7, 0.2, 1);
