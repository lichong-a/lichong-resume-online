import { RefObject } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP } from './gsap';

type ContextSafe = <Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
) => (...args: Args) => Return;

const revealSelector = [
  '[data-motion="section-heading"]',
  '[data-motion="reveal-card"]',
  '[data-motion="timeline-item"]',
  '[data-motion="project-card"]',
  '[data-motion="loop-step"]',
  '[data-motion="contact-link"]',
].join(',');

const identityContextSafe: ContextSafe = (fn) => fn;

type MotionKind =
  | 'section-heading'
  | 'reveal-card'
  | 'timeline-item'
  | 'project-card'
  | 'loop-step'
  | 'contact-link';

type RevealState = {
  opacity: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  filter?: string;
  transformOrigin?: string;
};

function canUseBrowserMotion() {
  return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof window.matchMedia === 'function';
}

function queryAll(root: HTMLElement, selector: string) {
  return Array.from(root.querySelectorAll<HTMLElement>(selector));
}

function keepMotionContentVisible(root: HTMLElement) {
  gsap.set(queryAll(root, '[data-motion]'), {
    opacity: 1,
    clearProps: 'transform,filter',
  });
}

function getMotionKind(element: HTMLElement): MotionKind {
  const motion = element.dataset.motion;

  if (
    motion === 'section-heading' ||
    motion === 'reveal-card' ||
    motion === 'timeline-item' ||
    motion === 'project-card' ||
    motion === 'loop-step' ||
    motion === 'contact-link'
  ) {
    return motion;
  }

  return 'reveal-card';
}

function getDesktopInitialState(kind: MotionKind, index: number): RevealState {
  const direction = index % 2 === 0 ? 1 : -1;
  const projectScales = [1.045, 0.92, 1.025, 0.94];
  const projectRotations = [-3.2, 2.6, -1.8, 3.4];

  switch (kind) {
    case 'section-heading':
      return {
        opacity: 0,
        y: 30,
        scale: 0.985,
        filter: 'blur(8px)',
        transformOrigin: '50% 100%',
      };
    case 'timeline-item':
      return {
        opacity: 0,
        x: direction * 34,
        y: 20,
        scale: 0.965,
        rotate: direction * 1.6,
        filter: 'blur(9px)',
        transformOrigin: direction > 0 ? '0% 50%' : '100% 50%',
      };
    case 'project-card':
      return {
        opacity: 0,
        x: direction * 18,
        y: 54,
        scale: projectScales[index % projectScales.length],
        rotate: projectRotations[index % projectRotations.length],
        filter: 'blur(10px)',
        transformOrigin: `${index % 2 === 0 ? '12%' : '88%'} 72%`,
      };
    case 'loop-step':
      return {
        opacity: 0,
        x: 18,
        y: 34,
        scale: 0.96,
        rotate: -1.2,
        filter: 'blur(7px)',
        transformOrigin: '0% 50%',
      };
    case 'contact-link':
      return {
        opacity: 0,
        y: 28,
        scale: 0.97,
        filter: 'blur(6px)',
        transformOrigin: '50% 100%',
      };
    case 'reveal-card':
    default:
      return {
        opacity: 0,
        y: 46,
        scale: index % 2 === 0 ? 0.925 : 1.035,
        rotate: direction * 2.4,
        filter: 'blur(9px)',
        transformOrigin: `${direction > 0 ? '18%' : '82%'} 78%`,
      };
  }
}

function getMobileInitialState(kind: MotionKind): RevealState {
  return {
    opacity: 0,
    y: kind === 'section-heading' ? 18 : 24,
    scale: kind === 'section-heading' ? 0.995 : 0.985,
    filter: 'blur(0px)',
    transformOrigin: '50% 100%',
  };
}

function getVisibleState(): RevealState {
  return {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
  };
}

function getDesktopExitState(kind: MotionKind, index: number): RevealState {
  const direction = index % 2 === 0 ? 1 : -1;

  if (kind === 'section-heading') {
    return {
      opacity: 0.68,
      y: -18,
      scale: 0.99,
      filter: 'blur(3px)',
    };
  }

  if (kind === 'project-card') {
    return {
      opacity: 0.5,
      x: direction * 10,
      y: -22,
      scale: index % 2 === 0 ? 0.96 : 1.018,
      rotate: direction * -1.6,
      filter: 'blur(5px)',
    };
  }

  return {
    opacity: kind === 'contact-link' ? 0.74 : 0.58,
    x: kind === 'timeline-item' ? direction * -10 : 0,
    y: -20,
    scale: 0.975,
    rotate: kind === 'reveal-card' || kind === 'loop-step' ? direction * -1 : 0,
    filter: 'blur(4px)',
  };
}

function getMobileExitState(): RevealState {
  return {
    opacity: 0.82,
    y: -10,
    scale: 0.99,
    filter: 'blur(0px)',
  };
}

function setupAnchorNavigation(root: HTMLElement) {
  const links = queryAll(root, 'a[href^="#"]') as HTMLAnchorElement[];
  const cleanup: Array<() => void> = [];

  links.forEach((link) => {
    const onClick = (event: MouseEvent) => {
      const href = link.getAttribute('href');

      if (!href || href.length <= 1) {
        return;
      }

      const target = document.getElementById(href.slice(1));

      if (!target) {
        return;
      }

      event.preventDefault();
      gsap.to(window, {
        duration: 0.86,
        ease: 'power3.out',
        overwrite: 'auto',
        scrollTo: {
          y: target,
          offsetY: window.innerWidth < 720 ? 24 : 92,
        },
      });
    };

    link.addEventListener('click', onClick);
    cleanup.push(() => link.removeEventListener('click', onClick));
  });

  return () => cleanup.forEach((removeListener) => removeListener());
}

function setupReveals(root: HTMLElement, contextSafe: ContextSafe, isDesktop: boolean) {
  const revealTargets = queryAll(root, revealSelector);
  const groupIndexes = new Map<MotionKind, number>();
  const triggers: ScrollTrigger[] = [];

  if (revealTargets.length === 0) {
    return () => undefined;
  }

  const revealTarget = contextSafe((target: HTMLElement, groupIndex: number) => {
    gsap.to(target, {
      ...getVisibleState(),
      duration: isDesktop ? 0.84 : 0.5,
      delay: Math.min(groupIndex, isDesktop ? 3 : 2) * (isDesktop ? 0.07 : 0.045),
      ease: isDesktop ? 'back.out(1.12)' : 'power3.out',
      overwrite: true,
    });
  });

  const settleTarget = contextSafe((target: HTMLElement, kind: MotionKind, groupIndex: number) => {
    gsap.to(target, {
      ...(isDesktop ? getDesktopExitState(kind, groupIndex) : getMobileExitState()),
      duration: isDesktop ? 0.5 : 0.28,
      ease: 'power2.out',
      overwrite: true,
    });
  });

  const resetTarget = contextSafe((target: HTMLElement, kind: MotionKind, groupIndex: number) => {
    gsap.to(target, {
      ...(isDesktop ? getDesktopInitialState(kind, groupIndex) : getMobileInitialState(kind)),
      duration: isDesktop ? 0.38 : 0.24,
      ease: 'power2.out',
      overwrite: true,
    });
  });

  revealTargets.forEach((target) => {
    const kind = getMotionKind(target);
    const groupIndex = groupIndexes.get(kind) ?? 0;

    groupIndexes.set(kind, groupIndex + 1);
    gsap.set(target, isDesktop ? getDesktopInitialState(kind, groupIndex) : getMobileInitialState(kind));

    triggers.push(
      ScrollTrigger.create({
        trigger: target,
        start: isDesktop ? 'top 84%' : 'top 88%',
        end: isDesktop ? 'bottom 12%' : 'bottom 8%',
        onEnter: () => revealTarget(target, groupIndex),
        onEnterBack: () => revealTarget(target, groupIndex),
        onLeave: () => settleTarget(target, kind, groupIndex),
        onLeaveBack: () => resetTarget(target, kind, groupIndex),
      }),
    );
  });

  return () => triggers.forEach((trigger) => trigger.kill());
}

function setupTimelineMotion(root: HTMLElement, isDesktop: boolean) {
  const timeline = root.querySelector<HTMLElement>('.timeline');
  const items = queryAll(root, '[data-motion="timeline-item"]');
  const cleanup: Array<() => void> = [];

  if (timeline && isDesktop) {
    gsap.fromTo(
      timeline,
      { '--timeline-progress': 0 },
      {
        '--timeline-progress': 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 70%',
          end: 'bottom 58%',
          scrub: 0.6,
        },
      },
    );
  }

  items.forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 64%',
      end: 'bottom 38%',
      onEnter: () => item.classList.add('is-active'),
      onEnterBack: () => item.classList.add('is-active'),
      onLeave: () => item.classList.remove('is-active'),
      onLeaveBack: () => item.classList.remove('is-active'),
    });
  });

  cleanup.push(() => items.forEach((item) => item.classList.remove('is-active')));

  return () => cleanup.forEach((runCleanup) => runCleanup());
}

function setupLoopSync(root: HTMLElement) {
  const steps = queryAll(root, '[data-motion="loop-step"]');
  const cleanup: Array<() => void> = [];

  steps.forEach((step) => {
    const node = root.querySelector<HTMLElement>(`[data-loop-node="${step.dataset.loopStep}"]`);
    const setActive = (active: boolean) => {
      step.classList.toggle('is-active', active);
      node?.classList.toggle('is-active', active);
    };

    ScrollTrigger.create({
      trigger: step,
      start: 'top 64%',
      end: 'bottom 40%',
      onEnter: () => setActive(true),
      onEnterBack: () => setActive(true),
      onLeave: () => setActive(false),
      onLeaveBack: () => setActive(false),
    });

    cleanup.push(() => setActive(false));
  });

  return () => cleanup.forEach((runCleanup) => runCleanup());
}

function setupDesktopMotion(root: HTMLElement, contextSafe: ContextSafe) {
  const cleanup: Array<() => void> = [];
  const heroTitle = root.querySelector<HTMLElement>('[data-motion="hero-title"]');
  const heroVisual = root.querySelector<HTMLElement>('[data-motion="hero-visual"]');
  const heroSection = root.querySelector<HTMLElement>('.hero-section');
  const particleField = root.querySelector<HTMLElement>('.particle-field');
  let splitTitle: SplitText | undefined;

  if (heroTitle) {
    splitTitle = SplitText.create(heroTitle, {
      aria: 'auto',
      linesClass: 'split-line',
      mask: 'lines',
      type: 'lines',
    });

    gsap.from(splitTitle.lines, {
      autoAlpha: 0,
      yPercent: 105,
      rotateX: -22,
      transformOrigin: '50% 100%',
      duration: 0.92,
      ease: 'power4.out',
      stagger: 0.08,
    });

    cleanup.push(() => splitTitle?.revert());
  }

  if (heroVisual && heroSection) {
    gsap.to(heroVisual, {
      y: -64,
      rotate: 1.2,
      scale: 0.965,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });
  }

  if (particleField) {
    gsap.to(particleField, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });
  }

  cleanup.push(setupReveals(root, contextSafe, true));
  cleanup.push(setupTimelineMotion(root, true));
  cleanup.push(setupLoopSync(root));

  return () => cleanup.forEach((runCleanup) => runCleanup());
}

function setupMobileMotion(root: HTMLElement, contextSafe: ContextSafe) {
  const cleanup = [
    setupReveals(root, contextSafe, false),
    setupTimelineMotion(root, false),
    setupLoopSync(root),
  ];

  return () => cleanup.forEach((runCleanup) => runCleanup());
}

export function useResumeScrollMotion(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(
    (_, contextSafe) => {
      const root = scopeRef.current;

      if (!root || !canUseBrowserMotion()) {
        return;
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        keepMotionContentVisible(root);
        return;
      }

      const safe = (contextSafe ?? identityContextSafe) as ContextSafe;
      const cleanupAnchorNavigation = setupAnchorNavigation(root);
      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px)', () => setupDesktopMotion(root, safe));
      mm.add('(max-width: 899px)', () => setupMobileMotion(root, safe));

      void document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        cleanupAnchorNavigation();
        mm.revert();
      };
    },
    { scope: scopeRef },
  );
}
