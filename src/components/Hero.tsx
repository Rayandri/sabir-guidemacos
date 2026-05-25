import { SECTIONS, ONELINER } from "../data";
import GlitchText from "./GlitchText";
import InstallTerminal from "./InstallTerminal";

type Props = { pct: number; done: number; total: number };

export default function Hero({ pct, done, total }: Props) {
  return (
    <header className="hero">
      <div className="hero-inner">
        <p className="hero-kicker">
          <span className="hero-prompt">➜</span> ~/nouveau-mac —{" "}
          <span className="hero-by">guide de rayan pour sabir</span>
        </p>

        <h1 className="hero-title">
          <GlitchText text="MAC_SETUP" as="span" className="ht-1" />
          <span className="ht-sep">//</span>
          <GlitchText text="SABIR" as="span" className="ht-2" />
        </h1>

        <p className="hero-tagline">
          Tout ce qu'il faut installer et régler en arrivant sur ton Mac : les
          apps utiles, les outils dev, et le terminal exactement comme le mien.
          Coche au fur et à mesure — c'est sauvegardé tout seul.
        </p>

        <div className="hero-stats">
          <span className="stat">
            <b>{SECTIONS.length}</b> phases
          </span>
          <span className="stat">
            <b>{total}</b> étapes
          </span>
          <span className="stat">
            <b>~30</b> min
          </span>
          <span className="stat">
            <b>{done}</b>/{total} faits · {pct}%
          </span>
        </div>

        <InstallTerminal command={ONELINER} />
      </div>

      <div className="hero-scroll" aria-hidden>
        <span>SCROLL</span>
        <span className="hero-scroll-bar" />
      </div>
    </header>
  );
}
