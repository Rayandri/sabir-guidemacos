import { type CSSProperties } from "react";
import type { Section } from "../data";
import ItemCard from "./ItemCard";

type Props = {
  section: Section;
  done: Record<string, boolean>;
  onToggle: (id: string) => void;
};

export default function Phase({ section, done, onToggle }: Props) {
  const total = section.items.length;
  const ok = section.items.filter((i) => done[i.id]).length;

  return (
    <section
      id={section.id}
      className={`phase${section.kind === "optional" ? " is-optional" : ""}`}
      style={{ "--sa": section.accent } as CSSProperties}
    >
      <header className="phase-head reveal">
        <div className="phase-index">
          <span className="phase-num">{section.num}</span>
          <span className="phase-line" />
        </div>
        <div className="phase-meta">
          <span className="phase-tag">PHASE_{section.num} // {section.tag}</span>
          <h2 className="phase-title">{section.title}</h2>
          {section.intro && <p className="phase-intro">{section.intro}</p>}
          <span className="phase-progress">
            {ok}/{total} complété{ok > 1 ? "s" : ""}
          </span>
        </div>
      </header>

      <div className="phase-items">
        {section.items.map((item, i) => (
          <ItemCard
            key={item.id}
            item={item}
            index={i}
            checked={!!done[item.id]}
            onToggle={() => onToggle(item.id)}
          />
        ))}
      </div>
    </section>
  );
}
