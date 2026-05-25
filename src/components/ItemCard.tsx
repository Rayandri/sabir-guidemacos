import type { Item } from "../data";
import Monogram from "./Monogram";
import CopyButton from "./CopyButton";
import KeyMap from "./KeyMap";

type Props = {
  item: Item;
  index: number;
  checked: boolean;
  onToggle: () => void;
};

export default function ItemCard({ item, index, checked, onToggle }: Props) {
  const isCask = item.cmd?.startsWith("brew install --cask") ?? false;
  const officialPrimary = isCask && !!item.link;

  return (
    <article
      className={`card reveal${checked ? " is-done" : ""}`}
      style={{ transitionDelay: `${Math.min(index, 6) * 45}ms` }}
    >
      <span className="card-edge" aria-hidden />

      <button
        className="card-check"
        onClick={onToggle}
        aria-pressed={checked}
        aria-label={checked ? "Décocher" : "Cocher"}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
          <path
            d="M5 12.5l4.5 4.5L19 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Monogram code={item.code} />

      <div className="card-body">
        <div className="card-title-row">
          <h3 onClick={onToggle}>{item.title}</h3>
          {item.link && !officialPrimary && (
            <a
              className="link-pill"
              href={item.link}
              target="_blank"
              rel="noreferrer"
            >
              {item.linkLabel} ↗
            </a>
          )}
        </div>

        <p className="card-desc">{item.desc}</p>

        {officialPrimary ? (
          <div className="install-block">
            <a
              className="dl-btn"
              href={item.link}
              target="_blank"
              rel="noreferrer"
            >
              <span className="dl-arrow">⬇</span> Télécharger
              <span className="dl-host">{item.linkLabel}</span>
            </a>
            {item.cmd && (
              <div className="alt-cmd">
                <span className="alt-label">// ou via Homebrew</span>
                <div className="cmd-row">
                  <code>
                    <span className="c-prompt">$</span> {item.cmd}
                  </code>
                  <CopyButton text={item.cmd} />
                </div>
              </div>
            )}
          </div>
        ) : (
          item.cmd && (
            <div className="cmd-row">
              <code>
                <span className="c-prompt">$</span> {item.cmd}
              </code>
              <CopyButton text={item.cmd} />
            </div>
          )
        )}

        {item.keymap && <KeyMap binds={item.keymap} />}

        {item.note && (
          <p className="card-note">
            <span className="note-tag">NOTE</span> {item.note}
          </p>
        )}
      </div>
    </article>
  );
}
