import type { KeyBind } from "../data";

export default function KeyMap({ binds }: { binds: KeyBind[] }) {
  return (
    <div className="keymap">
      <div className="keymap-head">RECTANGLE // SHORTCUTS</div>
      <div className="keymap-grid">
        {binds.map((k) => (
          <div className="keybind" key={k.action}>
            <span className="kb-action">{k.action}</span>
            <kbd>{k.keys}</kbd>
          </div>
        ))}
      </div>
    </div>
  );
}
