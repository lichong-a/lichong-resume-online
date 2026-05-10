import { render, screen } from '@testing-library/react';
import App from './App';
import { profile } from './content/profile';

const chineseMobilePattern = /1[3-9]\d{9}/;

describe('personal profile site', () => {
  it('renders the recruiting-focused hero and contact paths', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(profile.headline);
    expect(screen.getByRole('link', { name: /发送合作/i })).toHaveAttribute('href', `mailto:${profile.email}`);
    expect(screen.getAllByRole('link', { name: /社交主页/i }).length).toBeGreaterThan(0);
    expect(screen.getByText(profile.education)).toBeInTheDocument();
  });

  it('keeps private phone data out of rendered output and structured content', () => {
    render(<App />);

    expect(document.body.textContent).not.toMatch(chineseMobilePattern);
    expect(JSON.stringify(profile)).not.toMatch(chineseMobilePattern);
  });

  it('uses structured content for all primary sections', () => {
    render(<App />);

    for (const skill of profile.skills) {
      expect(screen.getByRole('heading', { name: skill.title })).toBeInTheDocument();
    }

    for (const experience of profile.experiences) {
      expect(screen.getByRole('heading', { name: experience.company })).toBeInTheDocument();
    }

    for (const project of profile.projects) {
      expect(screen.getByRole('heading', { name: project.name })).toBeInTheDocument();
    }
  });
});
