import { ContactSection } from './components/sections/ContactSection';
import { AgentLoopSection } from './components/sections/AgentLoopSection';
import { ExperienceTimeline } from './components/sections/ExperienceTimeline';
import { Hero } from './components/sections/Hero';
import { ProjectShowcase } from './components/sections/ProjectShowcase';
import { SkillMatrix } from './components/sections/SkillMatrix';
import { SiteShell } from './components/layout/SiteShell';

export default function App() {
  return (
    <SiteShell>
      <Hero />
      <SkillMatrix />
      <ExperienceTimeline />
      <ProjectShowcase />
      <AgentLoopSection />
      <ContactSection />
    </SiteShell>
  );
}
