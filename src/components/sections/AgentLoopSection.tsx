import { profile } from '../../content/profile';
import { SectionHeading } from '../ui/SectionHeading';

export function AgentLoopSection() {
  return (
    <section className="section-pad loop-section" id="agent-loop" aria-labelledby="agent-loop-title">
      <SectionHeading
        headingId="agent-loop-title"
        eyebrow="Agent Loop"
        title="设计、开发、测试、验证、修复的可维护闭环"
        intro="网站自身也按 Agent Loop 建设：内容结构化、组件可替换、验证可自动化、视觉差异可追踪。"
      />
      <div className="loop-board">
        <div className="loop-diagram" aria-hidden="true">
          {profile.agentLoop.map((step, index) => (
            <div className={`loop-node loop-node-${index + 1}`} key={step.name}>
              <span>{step.name}</span>
            </div>
          ))}
          <div className="loop-center">Loop</div>
        </div>
        <div className="loop-copy">
          {profile.agentLoop.map((step, index) => (
            <article key={step.name} className="loop-step">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{step.owner}</h3>
                <p>{step.output}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
