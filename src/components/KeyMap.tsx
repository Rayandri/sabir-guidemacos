import type { KeyBind } from "../data";

function Row({ k }: { k: KeyBind }) {
  return (
    <div className={`keybind${k.primary ? " is-primary" : ""}`}>
      <span className="kb-action">{k.action}</span>
      <kbd>{k.keys}</kbd>
    </div>
  );
}

export default function KeyMap({ binds }: { binds: KeyBind[] }) {
  const primary = binds.filter((b) => b.primary);
  const rest = binds.filter((b) => !b.primary);

  return (
    <div className="keymap">
      {primary.length > 0 && (
        <>
          <div className="keymap-head accent">
            ★ L'ESSENTIEL — à rebinder façon Windows
          </div>
          <div className="keymap-grid">
            {primary.map((k) => (
              <Row k={k} key={k.action} />
            ))}
          </div>
        </>
      )}
      {rest.length > 0 && (
        <>
          <div className="keymap-head muted">
            DÉFAUTS RECTANGLE — laisse tel quel
          </div>
          <div className="keymap-grid dim">
            {rest.map((k) => (
              <Row k={k} key={k.action} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
