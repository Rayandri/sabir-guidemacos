import { useEffect, useMemo, useState } from "react";
import { SECTIONS, INSTALL_URL, type Item, type Section } from "./data";
import CopyButton from "./components/CopyButton";
import "./App.css";

const STORAGE_KEY = "sabir-mac-progress-v1";

function loadDone(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export default function App() {
  const [done, setDone] = useState<Record<string, boolean>>(loadDone);
  const [activeId, setActiveId] = useState<string>(SECTIONS[0]?.id ?? "");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
  }, [done]);

  const allItems = useMemo(
    () => SECTIONS.flatMap((s) => s.items.map((i) => i.id)),
    [],
  );
  const doneCount = allItems.filter((id) => done[id]).length;
  const pct = Math.round((doneCount / allItems.length) * 100);

  // surligne la section visible dans la nav
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  function toggle(id: string) {
    setDone((d) => ({ ...d, [id]: !d[id] }));
  }

  function reset() {
    if (confirm("Remettre toute la progression a zero ?")) setDone({});
  }

  return (
    <div className="app">
      <Hero pct={pct} doneCount={doneCount} total={allItems.length} />

      <div className="layout">
        <nav className="toc" aria-label="Sommaire">
          <p className="toc-title">// sommaire</p>
          <ul>
            {SECTIONS.map((s) => {
              const total = s.items.length;
              const ok = s.items.filter((i) => done[i.id]).length;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={activeId === s.id ? "active" : ""}
                  >
                    <span className="toc-num">{s.num}</span>
                    <span className="toc-label">{s.title}</span>
                    <span className={`toc-count${ok === total ? " full" : ""}`}>
                      {ok}/{total}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <button className="reset-btn" onClick={reset}>
            reset progression
          </button>
        </nav>

        <main className="content">
          {SECTIONS.map((s) => (
            <SectionBlock
              key={s.id}
              section={s}
              done={done}
              onToggle={toggle}
            />
          ))}
          <footer className="footer">
            <span className="prompt">$</span> setup termine — bienvenue sur ton
            Mac, Sabir. <span className="by">fait par Rayan 🤝</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

function Hero({
  pct,
  doneCount,
  total,
}: {
  pct: number;
  doneCount: number;
  total: number;
}) {
  const oneLiner = `curl -fsSL ${INSTALL_URL} | bash`;
  return (
    <header className="hero">
      <div className="hero-inner">
        <div className="window-dots" aria-hidden>
          <span /> <span /> <span />
        </div>
        <p className="kicker">
          <span className="prompt">➜</span> ~/nouveau-mac
        </p>
        <h1>
          Mac Setup <span className="accent">— Sabir</span>
        </h1>
        <p className="tagline">
          Les apps a installer et les trucs a faire quand tu arrives sur ton
          Mac. Coche au fur et a mesure, c'est sauvegarde tout seul.
        </p>

        <div className="install-card">
          <div className="install-head">
            <span className="dim">// tout installer d'un coup</span>
          </div>
          <div className="cmd-row big">
            <code>{oneLiner}</code>
            <CopyButton text={oneLiner} />
          </div>
          <div className="install-actions">
            <a className="ghost-btn" href="/install.sh" download>
              ⬇ telecharger install.sh
            </a>
            <a className="ghost-btn" href="/Brewfile" download>
              ⬇ Brewfile
            </a>
          </div>
          <p className="install-note">
            Ce script fait tout : Homebrew, les apps, le terminal zsh + p10k. Tu
            peux aussi tout faire a la main, section par section ci-dessous.
          </p>
        </div>

        <div className="progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="progress-label">
            {doneCount}/{total} faits — {pct}%
          </span>
        </div>
      </div>
    </header>
  );
}

function SectionBlock({
  section,
  done,
  onToggle,
}: {
  section: Section;
  done: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <section
      id={section.id}
      className={`section${section.kind === "optional" ? " optional" : ""}`}
    >
      <div className="section-head">
        <span className="section-num">{section.num}</span>
        <h2>
          {section.emoji} {section.title}
        </h2>
      </div>
      {section.intro && <p className="section-intro">{section.intro}</p>}
      <div className="items">
        {section.items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            checked={!!done[item.id]}
            onToggle={() => onToggle(item.id)}
          />
        ))}
      </div>
    </section>
  );
}

function ItemRow({
  item,
  checked,
  onToggle,
}: {
  item: Item;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <article className={`item${checked ? " checked" : ""}`}>
      <button
        className="check"
        onClick={onToggle}
        aria-pressed={checked}
        aria-label={checked ? "Decocher" : "Cocher"}
      >
        {checked ? "✓" : ""}
      </button>
      <div className="item-body">
        <div className="item-title-row">
          <h3 onClick={onToggle}>{item.title}</h3>
          {item.link && (
            <a
              className="link-badge"
              href={item.link}
              target="_blank"
              rel="noreferrer"
            >
              {item.linkLabel || "lien"} ↗
            </a>
          )}
        </div>
        <p className="item-desc">{item.desc}</p>
        {item.cmd && (
          <div className="cmd-row">
            <code>
              <span className="prompt">$</span> {item.cmd}
            </code>
            <CopyButton text={item.cmd} />
          </div>
        )}
        {item.note && <p className="item-note">💡 {item.note}</p>}
      </div>
    </article>
  );
}
