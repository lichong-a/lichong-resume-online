import { ReactNode } from 'react';
import { profile } from '../../content/profile';
import { ParticleField } from '../ui/ParticleField';

const navItems = [
  { href: '#skills', label: '技能雷达' },
  { href: '#experience', label: '经历轨道' },
  { href: '#projects', label: '项目样本' },
  { href: '#agent-loop', label: 'Agent Loop' },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <ParticleField />
      <header className="site-header" aria-label="主导航">
        <a className="brand-lockup" href="#top" aria-label="李冲个人站首页">
          <span className="brand-mark" aria-hidden="true">
            LC
          </span>
          <span>
            <strong>{profile.name}</strong>
            <small>Agentic Delivery</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="页面章节">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href={`mailto:${profile.email}`}>
          预约沟通
        </a>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <span>© 2026 {profile.name}. Built as a static Agent-ready profile site.</span>
        <a href={profile.socialUrl} target="_blank" rel="noreferrer">
          社交主页
        </a>
      </footer>
    </div>
  );
}
