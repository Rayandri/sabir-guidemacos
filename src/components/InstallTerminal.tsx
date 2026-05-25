import { useEffect, useRef, useState } from "react";
import CopyButton from "./CopyButton";

/** Carte terminal : la commande tout-en-un se tape toute seule. */
export default function InstallTerminal({ command }: { command: string }) {
  const [typed, setTyped] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setTyped(command);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(command.slice(0, i));
      if (i >= command.length) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [command]);

  return (
    <div className="term">
      <div className="term-bar">
        <span className="term-dots">
          <i /> <i /> <i />
        </span>
        <span className="term-title">sabir@mac — zsh — 80×24</span>
        <span className="term-tag">SECURE</span>
      </div>
      <div className="term-body">
        <p className="term-comment">
          # raccourci express — tout installer via Homebrew
        </p>
        <p className="term-line">
          <span className="term-prompt">➜</span>
          <span className="term-path">~</span>
          <span className="term-cmd">{typed}</span>
          <span className="term-caret" />
        </p>
        <div className="term-actions">
          <CopyButton text={command} label="COPY COMMAND" />
          <a className="ghost-btn" href="/install.sh" download>
            ⬇ install.sh
          </a>
          <a className="ghost-btn" href="/Brewfile" download>
            ⬇ Brewfile
          </a>
        </div>
        <p className="term-note">
          Sinon (recommandé pour toujours avoir la dernière version) : installe
          chaque app depuis sa <b>source officielle</b>, phase par phase plus
          bas.
        </p>
      </div>
    </div>
  );
}
