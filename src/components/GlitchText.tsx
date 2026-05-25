type Props = {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2";
};

/** Texte avec effet glitch chromatique (cyan/magenta) via pseudo-elements CSS. */
export default function GlitchText({ text, className = "", as = "span" }: Props) {
  const Tag = as;
  return (
    <Tag className={`glitch ${className}`} data-text={text}>
      {text}
    </Tag>
  );
}
