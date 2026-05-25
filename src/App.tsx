import { useMemo, useState } from "react";
import { SECTIONS } from "./data";
import { useProgress } from "./hooks/useProgress";
import { useActiveSection } from "./hooks/useActiveSection";
import { useReveal } from "./hooks/useReveal";
import CyberBackground from "./components/CyberBackground";
import Overlay from "./components/Overlay";
import BootSequence from "./components/BootSequence";
import TopProgress from "./components/TopProgress";
import HudNav from "./components/HudNav";
import Hero from "./components/Hero";
import Phase from "./components/Phase";
import "./styles/index.css";

export default function App() {
  const { done, toggle, reset } = useProgress();
  const [booted, setBooted] = useState(false);

  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(ids, ids[0]);

  const allIds = useMemo(
    () => SECTIONS.flatMap((s) => s.items.map((i) => i.id)),
    [],
  );
  const doneCount = allIds.filter((id) => done[id]).length;
  const pct = Math.round((doneCount / allIds.length) * 100);

  useReveal([booted]);

  function handleReset() {
    if (confirm("Remettre toute la progression à zéro ?")) reset();
  }

  return (
    <>
      <CyberBackground />
      <Overlay />
      <BootSequence onDone={() => setBooted(true)} />
      <TopProgress pct={pct} />

      <div className={`app${booted ? " app--ready" : ""}`}>
        <Hero pct={pct} done={doneCount} total={allIds.length} />

        {pct === 100 && (
          <div className="celebrate reveal is-visible">
            <span className="celebrate-glitch" data-text="SETUP COMPLETE">
              SETUP COMPLETE
            </span>
            <p>Tout est coché — bienvenue sur ton Mac, Sabir.</p>
          </div>
        )}

        <div className="layout">
          <HudNav
            sections={SECTIONS}
            active={active}
            done={done}
            pct={pct}
            onReset={handleReset}
          />

          <main className="content">
            {SECTIONS.map((s) => (
              <Phase key={s.id} section={s} done={done} onToggle={toggle} />
            ))}

            <footer className="footer">
              <span className="footer-prompt">$</span> echo "build & deploy by
              claude code · made by rayan for sabir"
              <span className="footer-cursor" />
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
