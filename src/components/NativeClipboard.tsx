const ENTRIES = [
  { tag: "CMD", text: "curl -fsSL https://claude.ai/install.sh | bash", age: "à l'instant" },
  { tag: "URL", text: "github.com/Rayandri/zsh", age: "il y a 2 min" },
  { tag: "HEX", text: "#00f0ff", age: "il y a 6 min" },
  { tag: "TXT", text: "Bienvenue sur ton Mac, Sabir", age: "il y a 12 min" },
];

/** Maquette stylisee du presse-papier natif de Spotlight (macOS 26). */
export default function NativeClipboard() {
  return (
    <div className="native">
      <div className="native-head">
        <span className="native-badge">NATIF · macOS 26 · 0 INSTALL</span>
      </div>

      <div className="spotlight">
        <div className="spot-bar">
          <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden>
            <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="spot-q">Presse-papier</span>
          <span className="spot-hint">⌘ Espace</span>
        </div>
        <div className="spot-list">
          {ENTRIES.map((e, i) => (
            <div className={`clip-row${i === 0 ? " active" : ""}`} key={e.text}>
              <span className={`clip-tag t-${e.tag.toLowerCase()}`}>{e.tag}</span>
              <span className="clip-text">{e.text}</span>
              <span className="clip-age">{e.age}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
