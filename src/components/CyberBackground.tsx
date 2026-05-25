import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number };

/**
 * Fond anime : reseau de particules neon (nodes + liens) qui reagit
 * legerement a la souris. Canvas, requestAnimationFrame, DPR-aware.
 */
export default function CyberBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: P[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(110, Math.floor((w * h) / 16000));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    }

    const LINK = 132;
    function frame() {
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // attraction douce vers la souris
        const dxm = mouse.x - p.x;
        const dym = mouse.y - p.y;
        const dm2 = dxm * dxm + dym * dym;
        if (dm2 < 26000) {
          p.vx += dxm * 0.000018;
          p.vy += dym * 0.000018;
        }
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 0.7) {
          p.vx = (p.vx / sp) * 0.7;
          p.vy = (p.vy / sp) * 0.7;
        }
      }

      // liens
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const t = 1 - d / LINK;
            ctx!.strokeStyle = `rgba(0,240,255,${t * 0.18})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // nodes
      for (const p of particles) {
        const near = Math.hypot(mouse.x - p.x, mouse.y - p.y) < 150;
        ctx!.fillStyle = near
          ? "rgba(255,43,214,0.9)"
          : "rgba(0,240,255,0.55)";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, near ? 2.4 : 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onVis() {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduced) raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVis);

    if (reduced) {
      // rendu statique unique
      frame();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="cyber-bg" aria-hidden />;
}
