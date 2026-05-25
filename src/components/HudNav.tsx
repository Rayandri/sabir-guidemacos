import { type CSSProperties } from "react";
import type { Section } from "../data";

type Props = {
  sections: Section[];
  active: string;
  done: Record<string, boolean>;
  pct: number;
  onReset: () => void;
};

export default function HudNav({
  sections,
  active,
  done,
  pct,
  onReset,
}: Props) {
  return (
    <aside className="hud" aria-label="Navigation">
      <div className="hud-title">
        <span className="hud-dot" /> NAV_MAP
      </div>

      <div className="hud-ring" style={{ "--p": pct } as CSSProperties}>
        <span className="hud-ring-val">{pct}%</span>
      </div>

      <nav className="hud-nav">
        {sections.map((s) => {
          const total = s.items.length;
          const ok = s.items.filter((i) => done[i.id]).length;
          const full = ok === total;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`hud-node${active === s.id ? " active" : ""}`}
              style={{ "--sa": s.accent } as CSSProperties}
            >
              <span className="hud-node-num">{s.num}</span>
              <span className="hud-node-label">{s.title}</span>
              <span className={`hud-node-count${full ? " full" : ""}`}>
                {ok}/{total}
              </span>
            </a>
          );
        })}
      </nav>

      <button className="hud-reset" onClick={onReset}>
        ↺ RESET_PROGRESS
      </button>
    </aside>
  );
}
