type SectionHeadingProps = {
  headingId: string;
  eyebrow: string;
  title: string;
  intro: string;
};

export function SectionHeading({ headingId, eyebrow, title, intro }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p>{eyebrow}</p>
      <h2 id={headingId}>{title}</h2>
      <span>{intro}</span>
    </div>
  );
}
