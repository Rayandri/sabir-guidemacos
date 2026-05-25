import { useState } from "react";

type Props = { text: string; label?: string };

export default function CopyButton({ text, label = "COPY" }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      type="button"
      className={`copy-btn${copied ? " is-copied" : ""}`}
      onClick={copy}
      aria-label="Copier"
    >
      {copied ? "COPIED ✓" : label}
    </button>
  );
}
