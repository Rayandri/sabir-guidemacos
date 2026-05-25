import { useEffect, useState } from "react";

/** Renvoie l'id de la section actuellement visible (pour la nav HUD). */
export function useActiveSection(ids: string[], fallback: string) {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);

  return active;
}
