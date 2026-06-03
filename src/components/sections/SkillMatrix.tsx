import { profile } from '../../content/profile';
import { SectionHeading } from '../ui/SectionHeading';

export function SkillMatrix() {
  return (
    <section className="section-pad skill-section" id="skills" aria-labelledby="skills-title">
      <SectionHeading
        headingId="skills-title"
        eyebrow="Skill Radar"
        title="技能不是清单，而是可交付系统"
        intro="把前端体验、后端平台、数据链路、自动化交付和 AI Agent 编排放在同一个工程闭环里。"
      />
      <div className="skill-grid">
        {profile.skills.map((cluster, index) => (
          <article
            className="skill-card reveal-card"
            data-motion="reveal-card"
            style={{ animationDelay: `${index * 80}ms` }}
            key={cluster.title}
          >
            <div className="skill-card-index">{String(index + 1).padStart(2, '0')}</div>
            <h3>{cluster.title}</h3>
            <p>{cluster.signal}</p>
            <ul>
              {cluster.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
