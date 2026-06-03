import { profile } from '../../content/profile';
import { TechOrbit } from '../ui/TechOrbit';

export function Hero() {
  return (
    <section className="hero-section section-pad" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-kicker">AI-native Full-stack Engineer · Agentic Command Center</p>
        <h1 id="hero-title" data-motion="hero-title">
          {profile.headline}
        </h1>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-insights" aria-label="悬浮信息提示">
          {profile.heroInsights.map((insight, index) => {
            const tooltipId = `hero-insight-${index + 1}`;

            return (
              <div className="hero-insight" key={insight.label}>
                <button className="insight-trigger" type="button" aria-describedby={tooltipId}>
                  <span>{insight.label}</span>
                  <strong>{insight.title}</strong>
                </button>
                <div className="insight-tooltip" id={tooltipId} role="tooltip">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{insight.title}</strong>
                    <p>{insight.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="hero-actions" aria-label="主要操作">
          <a className="primary-action" href={`mailto:${profile.email}`}>
            发送合作 / 面试邀请
          </a>
          <a className="ghost-action" href={profile.socialUrl} target="_blank" rel="noreferrer">
            查看社交主页
          </a>
        </div>
        <dl className="hero-metrics" aria-label="个人能力概览">
          {profile.heroMetrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="hero-visual-wrap" data-motion="hero-visual">
        <TechOrbit />
        <div className="signal-card signal-card-left">
          <span>Current Focus</span>
          <strong>Agent Loop</strong>
        </div>
        <div className="signal-card signal-card-right">
          <span>Delivery Bias</span>
          <strong>Ship & Verify</strong>
        </div>
      </div>
    </section>
  );
}
