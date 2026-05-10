import { profile } from '../../content/profile';

export function TechOrbit() {
  const orbitLabels = ['AI', 'BAAS', 'AIOps', '3D', 'DevOps', 'GraphQL'];

  return (
    <div className="tech-orbit" aria-label="技术能力动态图谱">
      <div className="orbit-core">
        <span>Agent</span>
        <strong>Loop</strong>
      </div>
      {orbitLabels.map((label, index) => (
        <span key={label} className={`orbit-node orbit-node-${index + 1}`}>
          {label}
        </span>
      ))}
      <div className="code-stream" aria-hidden="true">
        <span>design → build → test → verify → repair</span>
        <span>{profile.title}</span>
        <span>observability.signal.map()</span>
      </div>
    </div>
  );
}
