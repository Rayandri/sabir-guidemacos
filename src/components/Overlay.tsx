import { useEffect } from "react";

/**
 * Calques d'ambiance poses au-dessus de tout : scanlines CRT, grain,
 * vignette, et une lueur neon qui suit le curseur.
 */
export default function Overlay() {
  useEffect(() => {
    const glow = document.getElementById("cursor-glow");
    if (!glow) return;
    let raf = 0;
    function move(e: MouseEvent) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow!.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    }
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cursor-glow" aria-hidden />
      <div className="fx-grid" aria-hidden />
      <div className="fx-scanlines" aria-hidden />
      <div className="fx-grain" aria-hidden />
      <div className="fx-vignette" aria-hidden />
    </>
  );
}
