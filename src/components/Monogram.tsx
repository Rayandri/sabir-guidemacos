/** Tuile monogramme neon (code 2-4 lettres) avec cadre hexagonal clippe. */
export default function Monogram({ code }: { code: string }) {
  return (
    <span className="mono-tile" aria-hidden>
      <span className="mono-frame" />
      <span className="mono-code">{code}</span>
    </span>
  );
}
