export default function TopProgress({ pct }: { pct: number }) {
  return (
    <div className="topbar" aria-hidden>
      <div className="topbar-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
