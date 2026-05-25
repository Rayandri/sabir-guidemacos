import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  SECTIONS,
  INSTALL_URL,
  type Item,
  type Section,
} from "./data";
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

  // nav : surligne la section visible
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // reveal au scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function toggle(id: string) {
    setDone((d) => ({ ...d, [id]: !d[id] }));
  }
  function reset() {
    if (confirm("Remettre toute la progression à zéro ?")) setDone({});
  }

  return (
    <div className="app">
      <div className="topbar">
        <div className="topbar-fill" style={{ width: `${pct}%` }} />
      </div>

      <Hero pct={pct} doneCount={doneCount} total={allItems.length} />

      {pct === 100 && (
        <div className="celebrate">
          🎉 Tout est coché — bienvenue sur ton Mac, Sabir. Setup terminé.
        </div>
      )}

      <div className="layout">
        <nav className="toc" aria-label="Sommaire">
          <p className="toc-title">// sommaire</p>
          <ul>
            {SECTIONS.map((s) => {
              const total = s.items.length;
              const ok = s.items.filter((i) => done[i.id]).length;
              const full = ok === total;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={activeId === s.id ? "active" : ""}
                    style={{ "--sa": s.accent } as CSSProperties}
                  >
                    <span className="toc-dot" data-full={full} />
                    <span className="toc-label">{s.title}</span>
                    <span className={`toc-count${full ? " full" : ""}`}>
                      {ok}/{total}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <button className="reset-btn" onClick={reset}>
            ↺ reset progression
          </button>
        </nav>

        <main className="content">
          {SECTIONS.map((s) => (
            <SectionBlock key={s.id} section={s} done={done} onToggle={toggle} />
          ))}
          <footer className="footer">
            <span className="prompt">$</span> echo "fait par Rayan pour Sabir 🤝"
          </footer>
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
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
      <div className="hero-glow" aria-hidden />
      <div className="hero-inner">
        <p className="kicker">
          <span className="prompt">➜</span> ~/nouveau-mac —{" "}
          <span className="blink">guide de Rayan</span>
        </p>
        <h1>
          Mac Setup
          <span className="accent"> pour Sabir</span>
        </h1>
        <p className="tagline">
          Tout ce qu'il faut installer et régler en arrivant sur ton Mac :
          les apps utiles, les outils dev, et le terminal exactement comme le
          mien. Coche au fur et à mesure — c'est sauvegardé tout seul.
        </p>

        <div className="hero-stats">
          <span>📂 {SECTIONS.length} sections</span>
          <span>✅ {total} étapes</span>
          <span>⏱️ ~30 min</span>
          <span>💾 progression auto</span>
        </div>

        <TerminalCard oneLiner={oneLiner} />

        <div className="progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="progress-label">
            {doneCount}/{total} — {pct}%
          </span>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
function TerminalCard({ oneLiner }: { oneLiner: string }) {
  const [typed, setTyped] = useState("");
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(oneLiner.slice(0, i));
      if (i >= oneLiner.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [oneLiner]);

  return (
    <div className="term">
      <div className="term-bar">
        <span className="dots">
          <i /> <i /> <i />
        </span>
        <span className="term-title">sabir@mac — ~</span>
      </div>
      <div className="term-body">
        <p className="term-comment"># tout installer d'un coup (le raccourci rapide, via Homebrew)</p>
        <p className="term-line">
          <span className="prompt">$</span>{" "}
          <span className="term-cmd">{typed}</span>
          <span className="caret" />
        </p>
        <div className="term-actions">
          <CopyButton text={oneLiner} label="copier la commande" />
          <a className="ghost-btn" href="/install.sh" download>
            ⬇ install.sh
          </a>
          <a className="ghost-btn" href="/Brewfile" download>
            ⬇ Brewfile
          </a>
        </div>
        <p className="term-note">
          Sinon (recommandé pour avoir toujours la dernière version) : installe
          chaque app depuis sa <strong>source officielle</strong>, section par
          section ci-dessous.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
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
      style={{ "--sa": section.accent } as CSSProperties}
    >
      <div className="section-head reveal">
        <span className="section-num">{section.num}</span>
        <div>
          <h2>
            <span className="section-emoji">{section.emoji}</span>
            {section.title}
          </h2>
          {section.intro && <p className="section-intro">{section.intro}</p>}
        </div>
      </div>
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

/* ------------------------------------------------------------------ */
function ItemRow({
  item,
  checked,
  onToggle,
}: {
  item: Item;
  checked: boolean;
  onToggle: () => void;
}) {
  const isCask = item.cmd?.startsWith("brew install --cask") ?? false;
  const officialPrimary = isCask && !!item.link;

  return (
    <article className={`item reveal${checked ? " checked" : ""}`}>
      <button
        className="check"
        onClick={onToggle}
        aria-pressed={checked}
        aria-label={checked ? "Décocher" : "Cocher"}
      >
        <span>✓</span>
      </button>

      <div className="icon-tile" aria-hidden>
        {item.icon}
      </div>

      <div className="item-body">
        <div className="item-title-row">
          <h3 onClick={onToggle}>{item.title}</h3>
          {item.link && !officialPrimary && (
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

        {officialPrimary ? (
          <>
            <a
              className="dl-btn"
              href={item.link}
              target="_blank"
              rel="noreferrer"
            >
              ⬇ Télécharger — {item.linkLabel}
            </a>
            {item.cmd && (
              <div className="alt-cmd">
                <span className="alt-label">ou via Homebrew</span>
                <div className="cmd-row">
                  <code>
                    <span className="prompt">$</span> {item.cmd}
                  </code>
                  <CopyButton text={item.cmd} />
                </div>
              </div>
            )}
          </>
        ) : (
          item.cmd && (
            <div className="cmd-row">
              <code>
                <span className="prompt">$</span> {item.cmd}
              </code>
              <CopyButton text={item.cmd} />
            </div>
          )
        )}

        {item.keymap && (
          <div className="keymap">
            {item.keymap.map((k) => (
              <div className="keybind" key={k.action}>
                <span className="kb-action">{k.action}</span>
                <kbd>{k.keys}</kbd>
              </div>
            ))}
          </div>
        )}

        {item.note && <p className="item-note">💡 {item.note}</p>}
      </div>
    </article>
  );
}
