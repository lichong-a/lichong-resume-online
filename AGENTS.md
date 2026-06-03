# AGENTS.md

## Project Goal

Build and maintain a static personal profile site for 李冲. The site is optimized for recruiting conversion and should quickly communicate:

- AI-native full-stack engineering capability
- Agentic Delivery and AI Agent loop practice
- Enterprise platform, observability, low-code, DevOps, and frontend 3D experience
- Clear contact path via email and social homepage

## Privacy Rules

- Do not publish or reintroduce the phone number from the source resume.
- Public contact methods are limited to `mail@lichong.work` and `https://nav-panel.lichong.work/` unless the user explicitly changes this rule.
- Education should stay brief: `太原理工大学 · 软件工程本科`.
- Before completion, scan source and build output for private contact leakage.

## Standard Commands

- Install dependencies: `pnpm install`
- Development server: `pnpm run dev`
- Type check: `pnpm run typecheck`
- Lint: `pnpm run lint`
- Unit/component tests: `pnpm run test`
- Production build: `pnpm run build`
- Static preview: `pnpm run preview`
- End-to-end validation: `pnpm run test:e2e`

## File Responsibilities

- `src/content/profile.ts`: Single source of truth for profile, skills, experiences, projects, education, and agent-loop content.
- `src/components/sections/*`: Page sections. Components should consume structured content instead of duplicating resume copy.
- `src/components/ui/*`: Reusable UI/motion primitives such as visual diagrams and section headings.
- `src/styles/tokens.css`: Design tokens for colors, fonts, spacing, radius, shadows, and motion timing.
- `src/styles/global.css`: Layout, components, responsive behavior, and reduced-motion handling.
- `docs/design-spec.md`: Design intent, section order, motion rules, and visual QA expectations.
- `docs/agent-loop.md`: Agent collaboration loop for design, development, testing, validation, and repair.
- `e2e/*`: Browser-level checks for content, privacy, responsiveness, and accessibility.

## Agent Roles

- Design Agent: Owns visual direction, content hierarchy, tokens, section rhythm, and motion intent.
- Implementation Agent: Owns React/Vite implementation, component boundaries, data flow, and maintainability.
- Test Agent: Owns typecheck, lint, unit tests, build, e2e, and privacy scan.
- Visual QA Agent: Owns screenshot checks across desktop/mobile, reduced-motion review, and visual ledger.
- Repair Agent: Fixes failures in priority order and reruns the smallest useful checks before full verification.

## Quality Gates

Do not mark work complete until all relevant gates pass:

- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run test`
- `pnpm run build`
- `pnpm run test:e2e`
- Preview smoke check via `pnpm run preview`
- Source/build privacy scan confirms the phone number is absent
- Desktop and mobile rendered screenshots show no obvious clipping, overlap, unreadable text, or horizontal overflow
- `prefers-reduced-motion` keeps content complete while reducing animation

## Maintenance Rules

- Add new work experience, projects, skills, or proof points in `src/content/profile.ts` first.
- If a new visual style is introduced, update both `src/styles/tokens.css` and `docs/design-spec.md`.
- Keep sections small and focused; do not turn `App.tsx` into a monolithic page.
- Keep visible UI text as real HTML. Do not use screenshots to represent resume content.
- Keep heavy dependencies out unless they materially improve the experience and are covered by tests.

## Prohibited Changes

- Do not publish the phone number from the resume.
- Do not bypass `prefers-reduced-motion`.
- Do not hard-code duplicate resume copy inside multiple components.
- Do not introduce generic template sections that dilute the Agentic Command Center direction.
- Do not ship placeholder boxes, broken links, or inert primary CTAs.
