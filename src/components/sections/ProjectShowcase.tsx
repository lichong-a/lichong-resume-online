import { profile } from '../../content/profile';
import { SectionHeading } from '../ui/SectionHeading';

export function ProjectShowcase() {
  return (
    <section className="section-pad project-section" id="projects" aria-labelledby="projects-title">
      <SectionHeading
        headingId="projects-title"
        eyebrow="Project Samples"
        title="把复杂平台做成可解释的工程样本"
        intro="每个项目都压缩为问题、技术路线和可验证成果，方便招聘方快速判断匹配度。"
      />
      <div className="project-grid">
        {profile.projects.map((project, index) => (
          <article className="project-card" data-motion="project-card" key={project.name}>
            <div className="project-card-topline">
              <span>{project.period}</span>
              <strong>{project.role}</strong>
            </div>
            <h3>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              {project.name}
            </h3>
            <p>{project.summary}</p>
            <div className="stack-list" aria-label={`${project.name} 技术栈`}>
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <ul className="outcome-list">
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
