import { profile } from '../../content/profile';
import { SectionHeading } from '../ui/SectionHeading';

export function ExperienceTimeline() {
  return (
    <section className="section-pad timeline-section" id="experience" aria-labelledby="experience-title">
      <SectionHeading
        headingId="experience-title"
        eyebrow="Work Timeline"
        title="从中间件、技术中台到智能观测平台"
        intro="经历按影响力重新组织：强调架构升级、工程规范、DevOps、团队协作和 AI 新范式推广。"
      />
      <div className="timeline" role="list">
        {profile.experiences.map((experience, index) => (
          <article className="timeline-item" role="listitem" key={experience.company}>
            <div className="timeline-pin" aria-hidden="true">
              {index + 1}
            </div>
            <div className="timeline-card">
              <div className="timeline-meta">
                <span>{experience.period}</span>
                <strong>{experience.role}</strong>
              </div>
              <h3>{experience.company}</h3>
              <p>{experience.impact}</p>
              <ul>
                {experience.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
