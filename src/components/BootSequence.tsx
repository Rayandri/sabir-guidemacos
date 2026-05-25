import { useEffect, useRef, useState } from "react";

const LINES = [
  "[ ok ] init macos_setup_sequence",
  "[ ok ] mount /Users/sabir",
  "[ ok ] detect hardware: MacBook Pro 16\"",
  "[ ok ] load modules ......... 6/6",
  "[ ok ] establish secure_link  rayan@div",
  "[ >> ] rendering interface ...",
];

/**
 * Overlay de demarrage facon boot systeme. Joue une fois par session,
 * puis se retire. Respecte prefers-reduced-motion (skip immediat).
 */
export default function BootSequence({ onDone }: { onDone: () => void }) {
  const seen =
    typeof sessionStorage !== "undefined" &&
    sessionStorage.getItem("booted") === "1";
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [shown, setShown] = useState<number>(seen || reduced ? LINES.length : 0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  function finish() {
    if (done.current) return;
    done.current = true;
    try {
      sessionStorage.setItem("booted", "1");
    } catch {
      /* ignore */
    }
    setLeaving(true);
    setTimeout(onDone, 650);
  }

  useEffect(() => {
    if (seen || reduced) {
      finish();
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(i);
      if (i >= LINES.length) {
        clearInterval(id);
        setTimeout(finish, 520);
      }
    }, 230);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (seen || reduced) return null;

  return (
    <div
      className={`boot${leaving ? " boot--leave" : ""}`}
      onClick={finish}
      role="presentation"
    >
      <div className="boot-inner">
        <p className="boot-head">MAC_SETUP // SABIR</p>
        <div className="boot-log">
          {LINES.slice(0, shown).map((l, i) => (
            <p key={i} className="boot-line">
              {l}
            </p>
          ))}
          <span className="boot-caret" />
        </div>
        <p className="boot-skip">click to skip</p>
      </div>
    </div>
  );
}
