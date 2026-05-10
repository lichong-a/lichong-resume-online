export function ParticleField() {
  return (
    <div className="particle-field" aria-hidden="true">
      {Array.from({ length: 24 }, (_, index) => (
        <span key={index} className={`particle particle-${index + 1}`} />
      ))}
    </div>
  );
}
