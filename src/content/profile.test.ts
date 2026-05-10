import { profile } from './profile';

const chineseMobilePattern = /1[3-9]\d{9}/;

describe('profile content', () => {
  it('redacts phone numbers while preserving public contact links', () => {
    const serialized = JSON.stringify(profile);

    expect(serialized).not.toMatch(chineseMobilePattern);
    expect(profile.email).toBe('mail@lichong.work');
    expect(profile.socialUrl).toBe('https://nav-panel.lichong.work/');
  });

  it('keeps education intentionally brief', () => {
    expect(profile.education).toBe('太原理工大学 · 软件工程本科');
    expect(profile.education).not.toContain('课程');
    expect(profile.education).not.toContain('三下乡');
  });

  it('keeps the project and skill data rich enough for the page', () => {
    expect(profile.skills).toHaveLength(6);
    expect(profile.projects.length).toBeGreaterThanOrEqual(5);
    expect(profile.agentLoop.map((step) => step.name)).toEqual(['Design', 'Develop', 'Test', 'Verify', 'Repair']);
  });
});
