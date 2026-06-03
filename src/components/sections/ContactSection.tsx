import { profile } from '../../content/profile';
import { SectionHeading } from '../ui/SectionHeading';

export function ContactSection() {
  return (
    <section className="section-pad contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-panel">
        <SectionHeading
          headingId="contact-title"
          eyebrow="Next Signal"
          title="如果你需要能把想法推到生产环境的人"
          intro="我适合参与 AI 工程化、企业平台、前沿前端、AIOps、低代码和 DevOps 交付体系相关机会。"
        />
        <div className="contact-grid">
          <a className="contact-link" data-motion="contact-link" href={`mailto:${profile.email}`}>
            <span>邮箱</span>
            <strong>{profile.email}</strong>
          </a>
          <a className="contact-link" data-motion="contact-link" href={profile.socialUrl} target="_blank" rel="noreferrer">
            <span>社交主页</span>
            <strong>nav-panel.lichong.work</strong>
          </a>
          <div className="contact-link contact-link-static" data-motion="contact-link">
            <span>教育经历</span>
            <strong>{profile.education}</strong>
          </div>
        </div>
        <ul className="proof-list" aria-label="个人优势摘要">
          {profile.proofPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
